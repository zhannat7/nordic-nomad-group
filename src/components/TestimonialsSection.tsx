import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

const testimonials = [
  { quote: 'Altid parate til at hjælpe og meget meget løsningsorienterede.', name: 'Torben Hauskov', role: 'Landmand' },
  { quote: 'Professionel rekruttering af praktikanter. Hurtig sagsbehandling, og derefter skattekort før medarbejderen kommer til Danmark.', name: 'Jesper Kaag Andersen', role: 'Landmand' },
  { quote: '100% opfølgning, troværdighed, fuld fart, forståelse.', name: 'Anders Kappel', role: 'Landmand' },
];

const TestimonialsSection = () => {
  const { t } = useI18n();

  return (
    <section className="section-padding border-t border-border">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-3 text-muted-foreground">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              className="legal-card"
            >
              <p className="text-sm italic leading-relaxed text-foreground">"{item.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
