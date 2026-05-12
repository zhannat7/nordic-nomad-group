import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import wheat from '@/assets/wheat.jpg';

const reasons = [
  { titleKey: 'why1.title', descKey: 'why1.desc', num: '01' },
  { titleKey: 'why2.title', descKey: 'why2.desc', num: '02' },
  { titleKey: 'why3.title', descKey: 'why3.desc', num: '03' },
];

const WhySection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';

  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${wheat})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />

      <div className="container relative max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-background/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-background/70">
                Why us — 02
              </span>
            </div>
            <h2 className={`mt-6 font-display text-4xl leading-[1.05] text-background md:text-[3.2rem] ${cx}`}>
              {t('why.title')}
            </h2>
            <p className={`mt-6 max-w-md text-base leading-relaxed text-background/70 ${cx}`}>
              {t('why.desc')}
            </p>
          </motion.div>

          <div className="md:col-span-7 md:pl-8">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-background/15 py-8 first:border-t-0 first:pt-0 md:gap-10 md:py-10"
              >
                <span className="font-display text-3xl text-accent md:text-4xl">{reason.num}</span>
                <div>
                  <h3 className={`font-display text-2xl text-background md:text-3xl ${cx}`}>
                    {t(reason.titleKey)}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed text-background/70 md:text-base ${cx}`}>
                    {t(reason.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
