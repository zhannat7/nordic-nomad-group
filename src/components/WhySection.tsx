import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const reasons = [
  { titleKey: 'why1.title', descKey: 'why1.desc', num: '01' },
  { titleKey: 'why2.title', descKey: 'why2.desc', num: '02' },
  { titleKey: 'why3.title', descKey: 'why3.desc', num: '03' },
];

const WhySection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <span className="section-label">{t('why.title')}</span>
          <h2 className={`section-title ${cx}`}>{t('why.title')}</h2>
          <p className={`section-desc ${cx}`}>{t('why.desc')}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-base"
            >
              <span className="mb-3 block font-display text-4xl font-normal text-primary/15">
                {reason.num}
              </span>
              <h3 className={`font-display text-lg text-foreground ${cx}`}>
                {t(reason.titleKey)}
              </h3>
              <p className={`mt-2 text-sm text-muted-foreground leading-relaxed ${cx}`}>
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
