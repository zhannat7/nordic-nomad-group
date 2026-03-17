import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import heroBg from '@/assets/hero-bg.jpg';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-foreground/70" />

      <div className="container relative z-10 grid min-h-[520px] items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.p
            variants={itemVariants}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-foreground/70"
          >
            {t('hero.tagline')}
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className={`font-display text-4xl leading-[1.1] tracking-tight text-primary-foreground md:text-5xl lg:text-6xl ${isCyrillic ? 'cyrillic-text' : ''}`}
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className={`mt-6 max-w-[55ch] text-base leading-relaxed text-primary-foreground/80 md:text-lg ${isCyrillic ? 'cyrillic-text' : ''}`}
          >
            {t('hero.subtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          className="flex flex-col gap-4"
        >
          <a
            href="tel:+4552808621"
            className="legal-card flex items-center gap-4 !border-primary/30 !bg-card/95 transition-transform active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">+45 52 80 86 21</p>
              <p className="text-xs text-muted-foreground">{t('contact.phone_hours')}</p>
            </div>
          </a>

          <a
            href="https://wa.me/4552808621"
            target="_blank"
            rel="noopener noreferrer"
            className="legal-card flex items-center gap-4 !border-accent/30 !bg-card/95 transition-transform active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">WhatsApp</p>
              <p className="text-xs text-muted-foreground">{t('contact.response')}</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
