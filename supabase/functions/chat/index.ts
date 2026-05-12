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

function extractPhone(msg: string): string | null {
  const match = msg.match(/[\+\d][\d\s\-\(\)]{6,20}\d/);
  if (match) return match[0].replace(/\s/g, "");
  return null;
}

function lastAssistantAskedForWhatsApp(messages: any[]): boolean {
  const last = [...messages].reverse().find((m: any) => m.role === "assistant");
  if (!last) return false;
  const c = last.content.toLowerCase();
  return c.includes("whatsapp") || c.includes("ватсап") || c.includes("номер") || c.includes("номериңиз");
}

function isFirstUserMessage(messages: any[]): boolean {
  return messages.filter((m: any) => m.role === "user").length === 1;
}

async function saveLead(whatsapp: string, lang: string, preferred_days: string) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey) return;
  await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    body: JSON.stringify({ whatsapp, lang, preferred_days }),
  });
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

ПРАВИЛО МОТИВАЦИИ:
Если у человека нет нужной учёбы или он учится не там — не отказывай. Мотивируй тепло и честно.
Признай что поступить в новый вуз — это и время, и деньги на семестр. Скажи:
"Я понимаю, что начать новое обучение — это и время, и расходы. Но это реальный путь в Данию, и я готова помочь разобраться с каждым шагом. Многие наши кандидаты начинали именно так — и у них получилось."
Дай человеку почувствовать что он не одинок и что это выполнимо.

ПРАВИЛО РЕГИСТРАЦИИ:
Любой человек 18–29 лет может зарегистрироваться на сайте прямо сейчас — даже если документы ещё не готовы.
Важно предупредить: если в течение 6 месяцев после регистрации не загружены все документы — профиль удаляется автоматически.

ПРАВИЛО ТЕЛЕФОНА ПРИ НЕУВЕРЕННОСТИ:
Если пользователь задаёт много неясных вопросов, колеблется или явно растерян — не жди конца разговора.
Скажи: "Я вижу что у вас много вопросов — давайте я вам перезвоню и объясню всё лично. Это займёт 10–15 минут и всё станет ясно."
Затем сразу спроси: "В какие дни вам удобно и ваш номер WhatsApp?"
Тахмина не хочет терять ни одного кандидата — каждый человек 18–29 лет важен.

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

МОТИВАЦИЯ ЭРЕЖЕСИ:
Туура жерде окубаса же окуусу жок болсо — дароо баш тартпа. Жылуу жана чынчыл мотивациялагын.
Жаңы окуу жайга кирүү убакытты да, семестр акысын да талап кылаарын моюнда. Мындай де:
"Жаңы окуу баштоо оңой эмес экенин түшүнөм — убакыт да, акча да керек. Бирок бул Данияга баруунун чыныгы жолу, жана мен ар бир кадамда жардам берүүгө даярмын. Биздин кандидаттардын көбү так ушундай баштаган."
Адамга жалгыз эмес экенин жана бул мүмкүн экенин сездир.

КАТТОО ЭРЕЖЕСИ:
18–29 жаштагы каалаган адам азыр эле сайтка катталса болот — документтер даяр болбосо дагы.
Маанилүү: каттоодон кийин 6 ай ичинде бардык документтер жүктөлбөсө — профиль автоматтык түрдө жок кылынат.

ТЕЛЕФОН ЭРЕЖЕСИ ШЕКТЕНҮҮДӨ:
Колдонуучу көп түшүнүксүз суроолор берсе, шектенсе же чаташса — разговордун аягын күтпө.
Мындай де: "Суроолоруңуз көп экенин көрүп жатам — мен өзүм чалып, баарын жеке түшүндүрсөм болот. Бул 10–15 мүнөт гана."
Андан кийин дароо сура: "Кайсы күндөрү ыңгайлуу жана WhatsApp номериңиз?"
Тахмина бир да кандидатты жоготкусу келбейт — 18–29 жаштагы ар бир адам маанилүү.

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

    // Telefonnummer erkennen und speichern
    if (lastAssistantAskedForWhatsApp(messages.slice(0, -1))) {
      const phone = extractPhone(lastUserMsg);
      if (phone) {
        await saveLead(phone, l, lastUserMsg);
      }
    }

    if (isFirstUserMessage(messages)) {
      const age = extractAge(lastUserMsg);
      if (age !== null) {
        if (age < 18) return fixedStreamResponse(FIXED[l].too_young, corsHeaders);
        if (age > 29) return fixedStreamResponse(FIXED[l].too_old, corsHeaders);
        return fixedStreamResponse(FIXED[l].age_ok, corsHeaders);
      }
    }

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
