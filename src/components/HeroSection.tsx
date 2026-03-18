import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { ArrowRight, Users, Globe, Shield } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const stats = [
  { icon: Users, value: '50+', labelKey: 'hero.stat_interns' },
  { icon: Globe, value: '2+', labelKey: 'hero.stat_years' },
  { icon: Shield, value: '100%', labelKey: 'hero.stat_legal' },
];

const HeroSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';

  return (
    <section className="relative overflow-hidden min-h-[560px] md:min-h-[640px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_14%/0.7)] via-[hsl(220_25%_14%/0.55)] to-[hsl(220_25%_14%/0.75)]" />

      <div className="container relative z-10 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
              🇩🇰 Denmark · 🇰🇬 Kyrgyzstan
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`font-display text-4xl font-normal leading-[1.08] text-white md:text-5xl lg:text-6xl ${cx}`}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mt-5 max-w-[50ch] text-base text-white/75 md:text-lg ${cx}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#about"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              {t('hero.tagline')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-lg border border-white/20 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/15"
            >
              {t('nav.contact')}
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-6"
          >
            {stats.map(({ icon: Icon, value, labelKey }) => (
              <div key={labelKey} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">{value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{t(labelKey)}</p>
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
