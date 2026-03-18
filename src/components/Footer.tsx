import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { ArrowUp, Clock, CircleDot, Instagram, Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const Footer = () => {
  const { t, isCyrillic } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="border-t border-border pb-16 pt-12 relative">
      <div className="container">
        {/* Main 3-column grid */}
        <div className="grid gap-10 md:gap-8 lg:grid-cols-3 mb-10">
          {/* Column 1: Company Info */}
          <div>
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-2xl tracking-tight transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1B3A6B', fontWeight: 700 }}>
                Nordic Nomad Group
              </span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {t('about.subtitle').substring(0, 150)}...
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/nordic_nomad_group/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:-translate-y-0.5"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              {t('contact.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+45 28 57 53 50</p>
                  <p className="text-xs text-muted-foreground">{t('contact.phone_hours')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail size={16} />
                </div>
                <p className="text-sm font-semibold text-foreground">info@nordic-nomad-group.dk</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Nordic Nomad Group</p>
                  <p className="text-xs text-muted-foreground">Lillemosevej 6, 4070 Kirke Hyllinge</p>
                  <p className="text-xs text-muted-foreground">CVR: 44829363</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 py-10 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle size={24} className="text-primary" />
                </div>
                <p className="font-display text-lg text-foreground">{t('contact.success')}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date().toLocaleString()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {t('contact.send')}
                </h3>
                <div>
                  <input
                    required
                    type="text"
                    placeholder={t('contact.name')}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <input
                    required
                    type="email"
                    placeholder={t('contact.email')}
                    className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder={t('contact.message')}
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none ring-ring transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span className={isCyrillic ? 'cyrillic-text' : ''}>{t('contact.consent')}</span>
                </label>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {t('contact.send')}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nordic Nomad Group. {t('footer.rights')}
          </p>

          <div className="flex items-center gap-6">
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <a href="#about" className="transition-colors hover:text-foreground">{t('nav.about')}</a>
              <a href="#contact" className="transition-colors hover:text-foreground">{t('nav.contact')}</a>
              <a href="#" className="transition-colors hover:text-foreground">{t('nav.privacy')}</a>
            </nav>

            <button
              onClick={scrollToTop}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:-translate-y-0.5"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CircleDot className="h-3 w-3 text-green-500" />
              {t('status.online')}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {t('status.response')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
