import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const reasons = [
  { titleKey: 'why1.title', descKey: 'why1.desc', num: '01' },
  { titleKey: 'why2.title', descKey: 'why2.desc', num: '02' },
  { titleKey: 'why3.title', descKey: 'why3.desc', num: '03' },
];

const WhySection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section className="section-padding border-t border-border relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] as const }}
          className="mb-16 max-w-2xl"
        >
          <span className="section-badge mb-4">
            {t('why.title')}
          </span>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-5xl">
            {t('why.title')}
          </h2>
          <p className={`mt-5 text-lg text-muted-foreground leading-relaxed ${isCyrillic ? 'cyrillic-text' : ''}`}>
            {t('why.desc')}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] as const }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="mb-4 block font-display text-5xl font-bold text-primary/10 transition-colors group-hover:text-primary/20">
                {reason.num}
              </span>
              <h3 className={`font-display text-xl text-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
                {t(reason.titleKey)}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed text-muted-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
                {t(reason.descKey)}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
