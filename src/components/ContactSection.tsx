import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, CheckCircle, MapPin, Send, Instagram } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const ContactSection = () => {
  const { t, isCyrillic } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding border-t border-border relative overflow-hidden">
      <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] as const }}
          >
            <span className="section-badge mb-4">✉️ Contact</span>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-5xl">
              {t('contact.title')}
            </h2>
            <p className={`mt-5 max-w-[50ch] text-lg text-muted-foreground leading-relaxed ${isCyrillic ? 'cyrillic-text' : ''}`}>
              {t('contact.desc')}
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">+45 28 57 53 50</p>
                  <p className="text-sm text-muted-foreground">{t('contact.phone_hours')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <p className="text-base font-semibold text-foreground">info@nordic-nomad-group.dk</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Nordic Nomad Group</p>
                  <p className="text-sm text-muted-foreground">Lillemosevej 6, 4070 Kirke Hyllinge, Denmark</p>
                  <p className="text-sm text-muted-foreground">CVR: 44829363</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://www.instagram.com/nordic_nomad_group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0, 0, 1] as const }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle size={32} className="text-primary" />
                </div>
                <p className="font-display text-2xl text-foreground">{t('contact.success')}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date().toLocaleString()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.name')}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.email')}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-ring transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span className={isCyrillic ? 'cyrillic-text' : ''}>{t('contact.consent')}</span>
                </label>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {t('contact.send')}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
