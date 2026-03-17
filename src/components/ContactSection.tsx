import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const ContactSection = () => {
  const { t, isCyrillic } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          >
            <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
              {t('contact.title')}
            </h2>
            <p className={`mt-4 max-w-[50ch] text-muted-foreground ${isCyrillic ? 'cyrillic-text' : ''}`}>
              {t('contact.desc')}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+45 52 80 86 21</p>
                  <p className="text-xs text-muted-foreground">{t('contact.phone_hours')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail size={18} />
                </div>
                <p className="text-sm font-semibold text-foreground">info@nordicnomadgroup.com</p>
              </div>
              <div className="mt-4 rounded-md border border-border bg-card p-3">
                <p className="text-xs font-semibold text-foreground">Nordic Nomad Group</p>
                <p className="text-xs text-muted-foreground">Lillemosevej 6, 4070 Kirke Hyllinge, Denmark</p>
                <p className="text-xs text-muted-foreground">CVR: 44829363</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0, 0, 1] }}
          >
            {submitted ? (
              <div className="legal-card flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={48} className="mb-4 text-primary" />
                <p className="font-display text-xl text-foreground">{t('contact.success')}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date().toLocaleString()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="legal-card space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    {t('contact.name')}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition-shadow focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    {t('contact.email')}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition-shadow focus:ring-2"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition-shadow focus:ring-2"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span className={isCyrillic ? 'cyrillic-text' : ''}>{t('contact.consent')}</span>
                </label>
                <button
                  type="submit"
                  className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
                >
                  {t('contact.send')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
