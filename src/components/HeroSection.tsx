import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { ArrowRight, Users, Globe, Shield } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

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

const HeroSection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-foreground/10" />

      {/* Decorative circles */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative z-10 py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
              🇩🇰 Denmark · 🇰🇬 Kyrgyzstan
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl ${isCyrillic ? 'cyrillic-text' : ''}`}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mt-6 max-w-[55ch] text-base leading-relaxed text-white/80 md:text-lg lg:text-xl ${isCyrillic ? 'cyrillic-text' : ''}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#about"
              className="group inline-flex h-13 items-center gap-2 rounded-lg bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              {t('hero.tagline')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-13 items-center rounded-lg border border-white/25 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
            >
              {t('nav.contact')}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-14 flex flex-wrap gap-8 border-t border-white/15 pt-8"
          >
            {stats.map(({ icon: Icon, value, labelKey }) => (
              <div key={labelKey} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-white/80" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/60">{t(labelKey)}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
