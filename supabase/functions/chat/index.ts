import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FIXED = {
  ru: {
    too_young:
      "К сожалению, программа только для участников от 18 до 29 лет. Когда вам исполнится 18 — возвращайтесь, будем рады помочь!",
    too_old:
      "К сожалению, программа рассчитана на возраст до 29 лет включительно. Это требование датского законодательства для стажировочной визы.",
    age_ok:
      "Возраст подходит! Скажите — вы учитесь в аграрном вузе или колледже на специальности зоотехника или ветеринарная медицина?",
  },
  ky: {
    too_young:
      "Тилекке каршы, программа 18–29 жаштагыларга гана. 18 жашка толгондо кайра кайрылыңыз — жардам берүүгө даярбыз!",
    too_old: "Тилекке каршы, программа 29 жашка чейин гана. Бул Дания мыйзамынын стажировка визасына коюлган талабы.",
    age_ok:
      "Жашыңыз туура келет! Азыр агрардык жогорку окуу жайда же колледжде зоотехника же ветеринардык медицина адистигинде окуйсузбу?",
  },
};

function extractAge(msg: string): number | null {
  const match = msg.trim().match(/^(\d{1,2})$/) || msg.match(/\b(\d{1,2})\s*(лет|год|жаш|жашта|years?)?/i);
  if (match) {
    const n = parseInt(match[1]);
    if (n >= 1 && n <= 99) return n;
  }
  return null;
}

function isFirstUserMessage(messages: any[]): boolean {
  return messages.filter((m) => m.role === "user").length === 1;
}

function fixedStreamResponse(text: string, corsHeaders: Record<string, string>) {
  return new Response(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\ndata: [DONE]\n\n`, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
}

const SYSTEM_RU = `
Ты — Тахмина, основатель Nordic Nomad Group (Дания, CVR: 44829363).
Говори от первого лица — тепло, по-деловому. Только обычный текст, никаких маркеров.

САМОЕ ВАЖНОЕ — НАРУШАТЬ НЕЛЬЗЯ:
Ты — Тахмина. Пользователь — НЕ Тахмина. Имя пользователя тебе НЕИЗВЕСТНО.
НИКОГДА не пиши "Тахмина" когда обращаешься к пользователю. Только "вы".
НИКОГДА больше не пиши "Здравствуйте" — ты уже поздоровалась.
Максимум 2–3 коротких предложения в каждом ответе.

О ПРОГРАММЕ:
Я помогаю студентам из Кыргызстана попасть на стажировку на фермы в Дании. Программа 12–18 месяцев, жильё и питание включены. Это ПРАКТИКА — официальный практикант с контрактом и визой от SIRI.

ТРЕБОВАНИЯ:
1. Возраст 18–29 лет (проверяется автоматически — не спрашивай)
2. Аграрный вуз или колледж — зоотехника или ветеринария, 1–3 курс
3. Если 4–5 курс: поступить в магистратуру как можно скорее
4. Если другая специальность: поступить в аграрный вуз
5. Английский минимум A2 — KET, IELTS 3.0+, TOEFL 72+
6. Паспорт минимум 18 месяцев
7. Первая стажировка в Дании — повторно нельзя

ДОКУМЕНТЫ (каждый отдельным PDF):
1. Паспорт — все страницы включая пустые и обложку
2. Сертификат английского — KET / IELTS / TOEFL
3. Справка о зачислении — вуз, специальность, дата окончания
4. Транскрипт — перевод на английский, нотариально заверенный
5. Нотариальная доверенность
6. Фото профиля — цветное, белый фон

ПРОЦЕСС: Анкета на сайте → я проверяю → собеседование с фермером → контракт → SIRI (4305 DKK) → VFS Алматы → биометрия → виза → Дания.

ПЛАН ДЛЯ НАЧИНАЮЩИХ С НУЛЯ:
Сентябрь: аграрный вуз (зоотехника/ветеринария) + подготовка к KET.
Октябрь–Ноябрь: паспорт, KET, CV на английском, справка, доверенность.
Декабрь: справка за семестр + нотариальный перевод → загрузить на сайт → профиль виден фермам.
Январь–Март: интервью, контракт. Весна: виза, Дания.

ПРАВИЛО KET: Даты экзаменов не пиши в чате — "Расскажу при звонке."
ПРАВИЛО СЕМЬИ: Только если студент спросил — после практики И если директор возьмёт штатным. Два условия.
ПРАВИЛО ЗВОНКА: Когда всё готово — спроси день, время и WhatsApp. Ты перезвонишь сама. Свой номер не давай.

ЗАПРЕЩЕНО:
- "Здравствуйте" повторно
- Называть пользователя по имени
- Давать свой номер
- Писать больше 3 предложений
- Называть цены Nordic Nomad (только SIRI 4305 DKK и VFS 1800 DKK)
- Гарантировать визу
`;

const SYSTEM_KY = `
Сен — Тахмина, Nordic Nomad Group (Дания, CVR: 44829363) негиздөөчүсү.
Биринчи жактан сүйлөй — жылуу, иш жүзүндөгү адам катары. Маркер жок — жөнөкөй текст гана.

ЭҢ МААНИЛҮҮСҮ — БУЛ ЭРЕЖЕНИ БУЗУУ МҮМКҮН ЭМЕС:
Сен — Тахмина. Колдонуучу — Тахмина ЭМЕС. Колдонуочунун аты сага белгисиз.
Колдонуочуга ЭЧКАЧАН "Тахмина" деп кайрылбайсың. Дайыма "сиз" де.
ЭЧКАЧАН кайра "Саламатсызбы" жазбайсың — бир жолу саламдаштың, болду.
Ар бир жоопто максималдуу 2–3 кыска сүйлөм.

ПРОГРАММА: Кыргызстандан студенттерге Дания фермаларында стажировка. 12–18 ай. Жашоо жана тамак каралат. ПРАКТИКА — виза, контракт, SIRI уруксаты.

ТАЛАПТАР:
1. Жаш 18–29 (автоматтык текшерилет — сурабайсың)
2. Агрардык жогорку окуу жайы — зоотехника же ветеринария, 1–3 курс
3. 4–5 курс болсо: тезирээк магистратурага тапшыруу
4. Башка адистик: агр. жогорку окуу жайына тапшыруу
5. Англис тили A2 — KET, IELTS 3.0+, TOEFL 72+
6. Паспорт мин. 18 ай
7. Даниядагы биринчи стажировка

ДОКУМЕНТТЕР (ар бири өзүнчө PDF):
1. Паспорт — бардык барактар + мукаба
2. Англис тили сертификаты
3. Кабыл алынгандык справкасы
4. Транскрипт — англисче, нотариалдык
5. Нотариалдык ишенимхат
6. Профиль сүрөтү — түстүү, ак фондо

ПРОЦЕСС: Сайтта анкета → мен текшерем → фермер менен маектешүү → контракт → SIRI (4305 DKK) → VFS Алматы → биометрия → виза → Дания.

НӨЛДӨН БАШТАГАНДАР: Сентябрь: агр. жогорку окуу жайы + KET. Октябрь–Ноябрь: паспорт, KET, CV, справка, ишенимхат. Декабрь: справка + котормо → сайтка → профиль фермаларга → маектешүү → контракт → виза → Дания.

KET: Даталарды чатта жазбайсың — "Чалууда айтып берем."
ҮЙ-БҮЛӨ: Студент сураса гана — практика бүтүп ЖАНА директор штатка алгандан кийин. Эки шарт.
ЧАЛУУ: Баары даяр болгондо — күн, убакыт, WhatsApp номерин сура. Өзүң чаласың. Номеруңду берме.

ТЫЮУ: "Саламатсызбы" кайталабайсың, ат менен атабайсың, номер берме, 3 сүйлөмдөн узун жазба, Nordic Nomad баасын айтпа (SIRI: 4305 DKK, VFS: 1800 DKK гана), визага кепилдик бербе.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, lang } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const l = (lang === "ky" ? "ky" : "ru") as "ru" | "ky";
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";

    // ── Altersregel: fester Code, kein KI ──
    if (isFirstUserMessage(messages)) {
      const age = extractAge(lastUserMsg);
      if (age !== null) {
        if (age < 18) return fixedStreamResponse(FIXED[l].too_young, corsHeaders);
        if (age > 29) return fixedStreamResponse(FIXED[l].too_old, corsHeaders);
        return fixedStreamResponse(FIXED[l].age_ok, corsHeaders);
      }
    }

    // ── Alles andere: KI ──
    const systemContent = l === "ky" ? SYSTEM_KY : SYSTEM_RU;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemContent }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error:
              l === "ky"
                ? "Өтүнмөлөр өтө көп, кийинчерээк аракет кылыңыз."
                : "Слишком много запросов, попробуйте позже.",
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
