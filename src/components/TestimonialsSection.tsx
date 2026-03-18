import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { MessageSquareQuote } from 'lucide-react';

const TestimonialsSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-label">🤝 Partners</span>
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-desc mx-auto">{t('testimonials.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mx-auto mt-12 flex max-w-md flex-col items-center rounded-xl border border-dashed border-border bg-card/50 px-8 py-14 text-center"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <MessageSquareQuote className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">{t('testimonials.empty')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
