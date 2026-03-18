import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const reasons = [
  { titleKey: 'why1.title', descKey: 'why1.desc' },
  { titleKey: 'why2.title', descKey: 'why2.desc' },
  { titleKey: 'why3.title', descKey: 'why3.desc' },
];

const WhySection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section className="section-padding border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
            {t('why.title')}
          </h2>
          <p className={`mt-4 text-muted-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
            {t('why.desc')}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
              className="legal-card"
            >
              <h3 className={`font-display text-lg text-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
                {t(reason.titleKey)}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
                {t(reason.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
