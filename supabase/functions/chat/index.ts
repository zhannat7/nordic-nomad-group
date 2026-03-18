import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, lang } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompts: Record<string, string> = {
      ky: `Сен Nordic Nomad Group компаниясынын жардамчы ботусуң. Nordic Nomad Group — Данияда катталган рекрутинг агенттиги, Кыргызстандан мотивациялуу жаштарды Дания фермаларына стажировкага жайгаштырат. Бардык суроолорго таза жана табигый кыргыз тилинде жооп бер. Жооптор кыска, түшүнүктүү, сүйлөм түрүндө болсун. Маркер, номерленген тизме, кыскартуулар, латын тамгалары, цифралар жана техникалык белгилерди колдонбо. A2/B1, IELTS, CVR сыяктуу белгилерди айтпа; алардын маанисин кыргызча жөнөкөй сөз менен түшүндүр.`
      ru: `Ты помощник компании Nordic Nomad Group. Nordic Nomad Group — рекрутинговое агентство, зарегистрированное в Дании (CVR: 44829363), которое помогает мотивированным молодым людям 18-29 лет из Кыргызстана пройти стажировку на фермах в Дании. Отвечай на все вопросы на русском языке. Будь кратким и полезным. Информация о компании: стажировка от 3 до 18 месяцев, требуется знание английского, компания берёт на себя все документы.`,
    };

    const systemContent = systemPrompts[lang] || systemPrompts['ru'];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemContent },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов, попробуйте позже." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Требуется оплата." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
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
