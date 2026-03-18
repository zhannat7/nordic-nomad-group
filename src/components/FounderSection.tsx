import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { User } from 'lucide-react';

const FounderSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';

  return (
    <section className="section-padding">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="section-label">👩‍💼 {t('founder.label')}</span>
          <h2 className={`section-title ${cx}`}>{t('founder.title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10"
        >
          {/* Photo placeholder */}
          <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted/60">
            <User className="h-16 w-16 text-muted-foreground/50" />
          </div>

          <div className="text-center sm:text-left">
            <h3 className={`font-display text-2xl text-foreground ${cx}`}>Tahmina</h3>
            <p className="mt-1 text-sm font-medium text-primary">{t('founder.role')}</p>
            <p className={`mt-4 text-sm leading-relaxed text-muted-foreground ${cx}`}>
              {t('founder.bio')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
