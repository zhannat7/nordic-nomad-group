import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, CheckCircle, MapPin, Send, Instagram } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const ContactSection = () => {
  const { t, isCyrillic } = useI18n();
  const cx = isCyrillic ? 'cyrillic-text' : '';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container max-w-5xl">
        <div className="grid gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">✉️ Contact</span>
            <h2 className={`section-title ${cx}`}>{t('contact.title')}</h2>
            <p className={`section-desc ${cx}`}>{t('contact.desc')}</p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+45 28 57 53 50</p>
                  <p className="text-xs text-muted-foreground">{t('contact.phone_hours')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Mail size={18} />
                </div>
                <p className="text-sm font-semibold text-foreground">info@nordic-nomad-group.dk</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Nordic Nomad Group</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Lillemosevej 6, 4070 Kirke Hyllinge, Denmark</p>
                  <p className="text-xs text-muted-foreground">CVR: 44829363</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/nordic_nomad_group/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <Instagram size={18} />
                </div>
                <p className="text-sm font-semibold text-foreground hover:text-primary transition-colors">@nordic_nomad_group</p>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-primary/15 bg-primary/5 py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle size={28} className="text-primary" />
                </div>
                <p className="font-display text-xl text-foreground">{t('contact.success')}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{new Date().toLocaleString()}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-7">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t('contact.name')}</label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t('contact.email')}</label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{t('contact.message')}</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span className={cx}>{t('contact.consent')}</span>
                </label>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t('contact.send')}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
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
