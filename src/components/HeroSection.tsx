import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { ArrowRight, Users, Globe, Shield } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0, 0, 1] as const } },
};

const stats = [
  { icon: Users, value: '50+', labelKey: 'hero.stat_interns' },
  { icon: Globe, value: '2+', labelKey: 'hero.stat_years' },
  { icon: Shield, value: '100%', labelKey: 'hero.stat_legal' },
];

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const floatingVariants2 = {
  animate: {
    y: [0, 12, 0],
    x: [0, -8, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const HeroSection = () => {
  const { t, isCyrillic } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[100vh] md:min-h-[100vh] flex items-center">
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${heroBg})`, y: bgY, scale: 1.15 }}
      />

      {/* Rich multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,50%,8%)]/90 via-[hsl(220,40%,15%)]/70 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,50%,5%)]/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(var(--primary)/0.15),transparent_60%)]" />

      {/* Animated decorative orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]"
      />
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[80px]"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute right-1/3 -top-20 h-[300px] w-[300px] rounded-full bg-[hsl(200,80%,50%)]/5 blur-[60px]"
      />

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container relative z-10 py-28 md:py-36">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md shadow-lg shadow-black/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              🇩🇰 Denmark · 🇰🇬 Kyrgyzstan
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`font-display text-4xl font-bold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-[0_2px_30px_rgba(0,0,0,0.3)] ${isCyrillic ? 'cyrillic-text' : ''}`}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mt-7 max-w-[55ch] text-base leading-relaxed text-white/70 md:text-lg lg:text-xl ${isCyrillic ? 'cyrillic-text' : ''}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-12 flex flex-wrap gap-4">
            <a
              href="#about"
              className="group relative inline-flex h-14 items-center gap-2 overflow-hidden rounded-xl bg-primary px-9 text-sm font-semibold text-primary-foreground shadow-[0_8px_32px_-4px] shadow-primary/40 transition-all duration-300 hover:shadow-[0_12px_40px_-4px] hover:shadow-primary/50 hover:-translate-y-1"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">{t('hero.tagline')}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-14 items-center rounded-xl border border-white/20 bg-white/[0.06] px-9 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:-translate-y-1"
            >
              {t('nav.contact')}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap gap-6 md:gap-10"
          >
            {stats.map(({ icon: Icon, value, labelKey }) => (
              <div
                key={labelKey}
                className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 transition-colors group-hover:bg-primary/25">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
                  <p className="text-xs text-white/50">{t(labelKey)}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
