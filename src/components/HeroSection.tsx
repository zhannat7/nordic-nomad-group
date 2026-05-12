import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ArrowUpRight, Sparkles } from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";
import internFarm from "@/assets/intern-farm.jpg";

const HeroSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? "cyrillic-text" : "";

  return (
    <section className="relative overflow-hidden bg-background">
      {/* subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="container relative grid gap-12 pb-20 pt-12 md:grid-cols-12 md:gap-10 md:pb-28 md:pt-16 lg:pt-20">
        {/* Left — editorial copy */}
        <div className="md:col-span-7 lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-foreground/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/70">
              Denmark · Est. 2024 · CVR 44829363
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className={`mt-7 font-display text-[2.6rem] leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-[5.2rem] ${cx}`}
          >
            {isCyrillic ? (
              t("hero.title")
            ) : (
              <>
                From the steppes <br className="hidden sm:block" />
                <span className="italic text-primary">of Kyrgyzstan</span> <br className="hidden sm:block" />
                to Danish farms.
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className={`mt-7 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg ${cx}`}
          >
            {isCyrillic
              ? t("hero.subtitle")
              : "We're a Denmark-registered consultancy placing motivated young students from Kyrgyzstan into official agricultural internships. Vetted candidates, handled paperwork, lasting partnerships."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-primary"
            >
              {t("hero.tagline")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground/70 underline decoration-foreground/30 underline-offset-[6px] transition-colors hover:text-foreground hover:decoration-foreground"
            >
              {t("nav.about")}
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid max-w-xl grid-cols-3 divide-x divide-foreground/10 border-y border-foreground/10 py-6"
          >
            {[
              { n: "50+", l: t("hero.stat_interns") },
              { n: "2", l: t("hero.stat_years") },
              { n: "100%", l: t("hero.stat_legal") },
            ].map((s, i) => (
              <div key={i} className="px-4 first:pl-0">
                <div className="font-display text-3xl text-foreground md:text-4xl">{s.n}</div>
                <div className={`mt-1 text-[11px] uppercase tracking-wider text-foreground/60 ${cx}`}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — editorial collage */}
        <div className="relative md:col-span-5 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2px] shadow-[var(--shadow-lg)]"
          >
            <img
              src={heroFarm}
              alt="Danish countryside farm at golden hour"
              className="h-full w-full object-cover"
              width={1600}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-background">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-background/80">Field Notes</p>
                <p className="mt-1 font-display text-lg leading-tight">Sjælland, Denmark</p>
              </div>
              <Sparkles className="h-4 w-4 text-background/80" />
            </div>
          </motion.div>

          {/* Floating image */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -left-6 hidden aspect-[3/4] w-40 overflow-hidden rounded-[2px] border-[6px] border-background shadow-[var(--shadow-md)] sm:block lg:-left-10 lg:w-48"
          >
            <img
              src={internFarm}
              alt="Intern at a Danish farm"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </motion.div>

          {/* Vertical caption */}
          <div className="absolute -right-2 top-6 hidden flex-col items-center gap-2 lg:flex">
            <span className="h-12 w-px bg-foreground/30" />
            <span
              className="rotate-180 text-[10px] uppercase tracking-[0.4em] text-foreground/50"
              style={{ writingMode: "vertical-rl" }}
            >
              Vol. 01 — 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
