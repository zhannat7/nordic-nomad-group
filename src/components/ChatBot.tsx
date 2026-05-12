import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useI18n } from "@/lib/i18n";

type Lang = "ky" | "ru";
type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const labels = {
  ky: {
    title: "Тахмина",
    subtitle: "онлайн",
    placeholder: "Тахминага жазуу...",
    greeting:
      "Саламатсызбы! Мен — Nordic Nomad Group компаниясынан Тахмина. Сизди көргөнүмө кубанычтамын. Айтыңызчы, жашыңыз канчада?",
    langSwitch: "🇷🇺 Русский",
  },
  ru: {
    title: "Тахмина",
    subtitle: "онлайн",
    placeholder: "Написать Тахмине...",
    greeting: "Здравствуйте! Я — Тахмина, Nordic Nomad Group. Рада вас видеть. Скажите, сколько вам лет?",
    langSwitch: "🇰🇬 Кыргызча",
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, lang }),
    signal,
  });

  if (!resp.ok || !resp.body) {
    const err = await resp.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `Request failed: ${resp.status}`);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });
    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        /* ignore */
      }
    }
  }
  onDone();
}

function speakText(text: string, lang: Lang): HTMLAudioElement {
  const baseCleanText = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/[#`>\[\]()!~|]/g, " ")
    .replace(/^[-•]\s*/gm, "")
    .replace(/^\d+\.\s*/gm, "")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/CVR:\s*\d+/gi, " ")
    .replace(/[\r\n]+/g, ". ")
    .replace(/\s{2,}/g, " ")
    .trim();

  const cleanText =
    lang === "ky"
      ? baseCleanText
          .replace(/[0-9]+(?:[–-][0-9]+)?/g, " ")
          .replace(/\b[A-Za-z][A-Za-z0-9/.-]*\b/g, " ")
          .replace(/[/:;(){}\[\]<>+=_%$@^~|\\]/g, " ")
          .replace(/\s{2,}/g, " ")
          .trim()
      : baseCleanText;

  window.speechSynthesis?.cancel();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.95;
  const voices = window.speechSynthesis.getVoices();

  if (lang === "ru") {
    utterance.lang = "ru-RU";
    const ruVoice = voices.find((v) => v.lang.startsWith("ru"));
    if (ruVoice) utterance.voice = ruVoice;
  } else {
    const kyVoice = voices.find((v) => v.lang.startsWith("ky"));
    const ruVoice = voices.find((v) => v.lang.startsWith("ru"));
    if (kyVoice) {
      utterance.lang = "ky-KG";
      utterance.voice = kyVoice;
    } else if (ruVoice) {
      utterance.lang = "ru-RU";
      utterance.voice = ruVoice;
    } else {
      utterance.lang = "ru-RU";
    }
  }

  window.speechSynthesis.speak(utterance);
  const audio = new Audio();
  utterance.onend = () => audio.dispatchEvent(new Event("ended"));
  return audio;
}

export default function ChatBot() {
  const { lang: pageLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("ru");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoOpenedRef = useRef(false);

  const l = labels[lang];

  // Auto-open when page switches to Russian or Kyrgyz
  useEffect(() => {
    if ((pageLang === "ru" || pageLang === "ky") && !open && !autoOpenedRef.current) {
      const chatLang = pageLang as Lang;
      const timer = setTimeout(() => {
        autoOpenedRef.current = true;
        setLang(chatLang);
        setMessages([{ role: "assistant", content: labels[chatLang].greeting }]);
        setOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pageLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: l.greeting }]);
    }
  };

  const toggleLang = () => {
    const newLang = lang === "ru" ? "ky" : "ru";
    setLang(newLang);
    setMessages([{ role: "assistant", content: labels[newLang].greeting }]);
  };

  const handleSpeak = (text: string, idx: number) => {
    if (speakingIdx === idx) {
      window.speechSynthesis?.cancel();
      audioRef.current = null;
      setSpeakingIdx(null);
      return;
    }
    window.speechSynthesis?.cancel();
    audioRef.current = null;
    const audio = speakText(text, lang);
    audioRef.current = audio;
    setSpeakingIdx(idx);
    audio.addEventListener("ended", () => {
      setSpeakingIdx(null);
      audioRef.current = null;
    });
    const check = setInterval(() => {
      if (!window.speechSynthesis?.speaking) {
        setSpeakingIdx(null);
        audioRef.current = null;
        clearInterval(check);
      }
    }, 500);
  };

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    abortRef.current = new AbortController();
    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > newMessages.length)
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        return [...prev, { role: "assistant", content: assistantSoFar }];
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
      if (e.name !== "AbortError") {
        setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ " + (e.message || "Ошибка") }]);
      }
      setIsLoading(false);
    }
  }, [input, messages, isLoading, lang]);

  return (
    <>
      {/* Floating button — Tahmina avatar */}
      <AnimatePresence>
        {!open && (pageLang === "ru" || pageLang === "ky") && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={handleOpen}
              className="relative h-14 w-14 rounded-full shadow-lg focus:outline-none"
              style={{ background: "#16a34a" }}
              aria-label="Написать Тахмине"
            >
              <span className="text-white font-semibold text-xl">Т</span>
              {/* Online dot */}
              <span
                className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{ background: "#22c55e" }}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (pageLang === "ru" || pageLang === "ky") && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            style={{ width: "380px", height: "500px" }}
          >
            {/* Header — looks like a personal contact */}
            <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-3">
              <div className="relative flex-shrink-0">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold text-base"
                  style={{ background: "#16a34a" }}
                >
                  Т
                </div>
                <span
                  className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background"
                  style={{ background: "#22c55e" }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground leading-none">{l.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#16a34a" }}>
                  ● {l.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLang}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {l.langSwitch}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3" style={{ background: "#f0f4f0" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Tahmina avatar next to her messages */}
                  {msg.role === "assistant" && (
                    <div
                      className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-semibold mb-1"
                      style={{ background: "#16a34a" }}
                    >
                      Т
                    </div>
                  )}
                  <div
                    className={`group relative max-w-[80%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-sm text-white"
                        : "rounded-bl-sm bg-white text-foreground shadow-sm"
                    }`}
                    style={msg.role === "user" ? { background: "#16a34a" } : {}}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none [&>p]:m-0">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                    {msg.role === "assistant" && msg.content && !isLoading && (
                      <button
                        onClick={() => handleSpeak(msg.content, i)}
                        className="absolute -bottom-5 right-1 rounded-full bg-background border border-border p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                        title={lang === "ru" ? "Прослушать" : "Угуу"}
                      >
                        {speakingIdx === i ? (
                          <VolumeX className="h-3 w-3 text-destructive" />
                        ) : (
                          <Volume2 className="h-3 w-3 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-end gap-2 justify-start">
                  <div
                    className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-semibold"
                    style={{ background: "#16a34a" }}
                  >
                    Т
                  </div>
                  <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-background px-3 py-2.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={l.placeholder}
                  className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm outline-none focus:ring-2 placeholder:text-muted-foreground"
                  style={{ focusRingColor: "#16a34a" } as React.CSSProperties}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white disabled:opacity-40 transition-opacity"
                  style={{ background: "#16a34a" }}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
