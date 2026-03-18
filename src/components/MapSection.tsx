import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const MapSection = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="section-padding border-t border-border relative overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] as const }}
          className="text-center mb-8"
        >
          <span className="section-badge mb-4">📍 {t('map.badge')}</span>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-5xl">
            {t('map.title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0, 0, 1] as const }}
          className="overflow-hidden rounded-2xl border border-border shadow-sm"
        >
          <iframe
            title="Nordic Nomad Group Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2237.5!2d11.887!3d55.642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGlsbGVtb3NldmVqIDYsIDQwNzAgS2lya2UgSHlsbGluZ2U!5e0!3m2!1sen!2sdk!4v1700000000000"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
