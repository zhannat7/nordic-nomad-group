import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const AboutSection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="container">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className={`prose-legal mx-auto text-center font-display text-xl italic leading-relaxed text-foreground md:text-2xl ${isCyrillic ? 'cyrillic-text' : ''}`}
        >
          {t('about.intro')}
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0, 0, 1] }}
          className={`prose-legal mx-auto mt-8 text-center text-sm leading-relaxed text-muted-foreground md:text-base ${isCyrillic ? 'cyrillic-text' : ''}`}
        >
          {t('about.body')}
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;
