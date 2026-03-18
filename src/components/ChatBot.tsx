import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

type Lang = 'ky' | 'ru';
type Msg = { role: 'user' | 'assistant'; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const labels = {
  ky: {
    title: 'Nordic Nomad Жардамчы',
    placeholder: 'Суроо жазыңыз...',
    greeting: 'Салам! Мен Nordic Nomad Group компаниясынын жардамчысымын. Сизге кандай жардам бере алам?',
    langSwitch: '🇷🇺 Русский',
  },
  ru: {
    title: 'Nordic Nomad Помощник',
    placeholder: 'Напишите вопрос...',
    greeting: 'Здравствуйте! Я помощник компании Nordic Nomad Group. Чем могу помочь?',
    langSwitch: '🇰🇬 Кыргызча',
  },
};

async function streamChat({
  messages,
  lang,
  onDelta,
  onDone,
  signal,
}: {
  messages: Msg[];
  lang: Lang;
  onDelta: (text: string) => void;
  onDone: () => void;
  signal?: AbortSignal;
}) {
  const resp = await fetch(CHAT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, lang }),
    signal,
  });

  if (!resp.ok || !resp.body) {
    const err = await resp.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `Request failed: ${resp.status}`);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = '';
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith('\r')) line = line.slice(0, -1);
      if (line.startsWith(':') || line.trim() === '') continue;
      if (!line.startsWith('data: ')) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === '[DONE]') {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + '\n' + textBuffer;
        break;
      }
    }
  }

  // Final flush
  if (textBuffer.trim()) {
    for (let raw of textBuffer.split('\n')) {
      if (!raw) continue;
      if (raw.endsWith('\r')) raw = raw.slice(0, -1);
      if (raw.startsWith(':') || raw.trim() === '') continue;
      if (!raw.startsWith('data: ')) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === '[DONE]') continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore */ }
    }
  }

  onDone();
}

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

async function speakTextElevenLabs(text: string, lang: Lang): Promise<HTMLAudioElement> {
  // Strip markdown for cleaner speech
  const cleanText = text.replace(/[*_#`>\[\]()!~]/g, '').replace(/\n+/g, ' ').trim();

  const response = await fetch(TTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ text: cleanText, lang }),
  });

  if (!response.ok) {
    throw new Error(`TTS failed: ${response.status}`);
  }

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  await audio.play();
  return audio;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('ru');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [ttsLoading, setTtsLoading] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const l = labels[lang];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load voices
  useEffect(() => {
    window.speechSynthesis?.getVoices();
    window.speechSynthesis?.addEventListener('voiceschanged', () => {});
  }, []);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: l.greeting }]);
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'ru' ? 'ky' : 'ru';
    setLang(newLang);
    setMessages([{ role: 'assistant', content: labels[newLang].greeting }]);
  };

  const handleSpeak = (text: string, idx: number) => {
    if (speakingIdx === idx) {
      window.speechSynthesis?.cancel();
      setSpeakingIdx(null);
    } else {
      speakText(text, lang);
      setSpeakingIdx(idx);
      // Reset when done
      const check = setInterval(() => {
        if (!window.speechSynthesis?.speaking) {
          setSpeakingIdx(null);
          clearInterval(check);
        }
      }, 300);
    }
  };

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Msg = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    abortRef.current = new AbortController();
    let assistantSoFar = '';

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > newMessages.length) {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant', content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: newMessages,
        lang,
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
        signal: abortRef.current.signal,
      });
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        console.error(e);
        setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ ' + (e.message || 'Ошибка') }]);
      }
      setIsLoading(false);
    }
  }, [input, messages, isLoading, lang]);

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpen}
              className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">{l.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLang}
                  className="h-7 px-2 text-xs text-primary-foreground hover:bg-white/20"
                >
                  {l.langSwitch}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-7 w-7 text-primary-foreground hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`group relative max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                    {msg.role === 'assistant' && msg.content && !isLoading && (
                      <button
                        onClick={() => handleSpeak(msg.content, i)}
                        className="absolute -bottom-5 right-1 rounded-full bg-background border border-border p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        title={lang === 'ru' ? 'Прослушать' : 'Угуу'}
                      >
                        {speakingIdx === i ? (
                          <VolumeX className="h-3.5 w-3.5 text-destructive" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-muted px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border px-3 py-2.5">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={l.placeholder}
                  className="flex-1 rounded-xl border border-border bg-muted/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
