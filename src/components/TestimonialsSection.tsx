import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { Quote } from 'lucide-react';

const testimonials = [
  { quote: 'Altid parate til at hjælpe og meget meget løsningsorienterede.', name: 'Torben Hauskov', role: 'Landmand, Danmark 🇩🇰' },
  { quote: 'Professionel rekruttering af praktikanter. Hurtig sagsbehandling, og derefter skattekort før medarbejderen kommer til Danmark.', name: 'Jesper Kaag Andersen', role: 'Landmand, Danmark 🇩🇰' },
  { quote: '100% opfølgning, troværdighed, fuld fart, forståelse.', name: 'Anders Kappel', role: 'Landmand, Danmark 🇩🇰' },
];

const TestimonialsSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding border-t border-border relative overflow-hidden">
      <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] as const }}
          className="mb-16 max-w-2xl"
        >
          <span className="section-badge mb-4">⭐ Testimonials</span>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-5xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.2, 0, 0, 1] as const }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/20 transition-colors group-hover:text-primary/40" />
              <p className="text-sm italic leading-relaxed text-foreground">"{item.quote}"</p>
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
