import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { MessageSquareQuote } from 'lucide-react';

const TestimonialsSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding border-t border-border relative overflow-hidden">
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] as const }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-badge mb-4">🤝 Partners</span>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-5xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0, 0, 1] as const }}
          className="mx-auto mt-16 flex max-w-lg flex-col items-center rounded-2xl border border-dashed border-border bg-card/50 px-8 py-16 text-center"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MessageSquareQuote className="h-8 w-8 text-primary/40" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {t('testimonials.empty')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
