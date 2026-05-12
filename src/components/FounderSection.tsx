import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Quote } from 'lucide-react';

const FounderSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';

  return (
    <section className="section-padding bg-background">
      <div className="container max-w-6xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-secondary to-accent/10">
                  <span className="font-display text-[10rem] leading-none text-foreground/20">T</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-4 right-4 bg-background px-5 py-4 shadow-[var(--shadow-md)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">
                  {t('founder.role')}
                </p>
                <p className={`mt-1 font-display text-xl text-foreground ${cx}`}>
                  {t('founder.name')}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['KY', 'RU', 'EN', 'TR', 'DA'].map((l) => (
                    <span key={l} className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-[10px] font-medium text-foreground/70">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7 md:pt-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/70">
                {t('founder.label')} — 03
              </span>
            </div>
            <h2 className={`mt-6 font-display text-3xl leading-[1.1] text-foreground md:text-5xl ${cx}`}>
              {t('founder.title')}
            </h2>
            <Quote className="mt-10 h-9 w-9 text-accent" strokeWidth={1.2} />
            <p className={`mt-5 font-display text-xl leading-[1.4] text-foreground/85 md:text-2xl ${cx}`}>
              {t('founder.bio')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
