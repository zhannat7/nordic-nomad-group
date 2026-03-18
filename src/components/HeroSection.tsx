import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import heroBg from '@/assets/hero-bg.jpg';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-[520px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-foreground/60" />

      <div className="container relative z-10 py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1
            variants={itemVariants}
            className={`font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl ${isCyrillic ? 'cyrillic-text' : ''}`}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mt-6 max-w-[50ch] text-base leading-relaxed text-white/85 md:text-lg ${isCyrillic ? 'cyrillic-text' : ''}`}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <a
              href="#services"
              className="inline-flex h-12 items-center rounded-md bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t('hero.tagline')}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
