import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const services = [
  { titleKey: 'service1.title', descKey: 'service1.desc', links: ['service1.link', 'service1.link2'] },
  { titleKey: 'service2.title', descKey: 'service2.desc', links: ['service2.link'] },
  { titleKey: 'service3.title', descKey: 'service3.desc', links: ['service3.link'] },
];

const ServicesSection = () => {
  const { t, isCyrillic } = useI18n();

  return (
    <section id="services" className="section-padding">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
              whileHover={{ y: -4 }}
              className="legal-card flex flex-col"
            >
              <span className="mb-3 font-display text-4xl text-primary/20">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={`font-display text-xl text-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
                {t(service.titleKey)}
              </h3>
              <p className={`mt-3 flex-1 text-sm leading-relaxed text-muted-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
                {t(service.descKey)}
              </p>
              <div className="mt-6 flex flex-col gap-2">
                {service.links.map((linkKey) => (
                  <a
                    key={linkKey}
                    href="#contact"
                    className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    {t(linkKey)}
                    <ArrowRight size={14} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
