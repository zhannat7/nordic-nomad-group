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
    <section className="relative overflow-hidden min-h-[130px] flex items-center">
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_14%/0.72)] via-[hsl(220_25%_14%/0.55)] to-[hsl(220_25%_14%/0.78)]" />

      <div className="container relative z-10 py-3 md:py-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            variants={itemVariants}
            className={`font-display text-2xl font-normal leading-[1.12] text-white md:text-3xl ${cx}`}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mt-2 max-w-[50ch] text-sm text-white/75 leading-relaxed hidden md:block ${cx}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-3">
            <a
              href="#about"
              className="group inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              {t('hero.tagline')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-9 items-center rounded-lg border border-white/20 bg-white/10 px-5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/15"
            >
              {t('nav.contact')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
