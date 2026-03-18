import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const MapSection = () => {
  const { t } = useI18n();

  return (
    <section id="contact" className="relative overflow-hidden bg-muted/30">
      {/* Full-width map with overlay card */}
      <div className="relative">
        {/* Map */}
        <div className="h-[500px] w-full">
          <iframe
            title="Nordic Nomad Group Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2237.5!2d11.887!3d55.642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGlsbGVtb3NldmVqIDYsIDQwNzAgS2lya2UgSHlsbGluZ2U!5e0!3m2!1sen!2sdk!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[30%] contrast-[1.05]"
          />
        </div>

        {/* Floating info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0, 0, 1] as const }}
          className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:max-w-sm"
        >
          <div className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-6 shadow-[var(--shadow-elevated)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t('map.title')}</h3>
                <p className="text-xs text-muted-foreground">Nordic Nomad Group</p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <p className="text-muted-foreground">
                Lillemosevej 6, 4070 Kirke Hyllinge, Denmark
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={14} className="text-primary/70" />
                <span>+45 28 57 53 50</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail size={14} className="text-primary/70" />
                <span>info@nordic-nomad-group.dk</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Lillemosevej+6,+4070+Kirke+Hyllinge,+Denmark"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              {t('map.directions')}
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
