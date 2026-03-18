import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { ArrowUp, Instagram, Send, CheckCircle, Clock, CircleDot } from 'lucide-react';

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
    <footer className="relative border-t border-border bg-card">
      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Company info + links */}
          <div className="flex flex-col justify-between gap-8">
            {/* Brand */}
            <div>
              <a href="#" className="inline-block group">
                <span
                  className="text-2xl tracking-tight transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1B3A6B', fontWeight: 700 }}
                >
                  Nordic Nomad Group
                </span>
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground leading-relaxed">
                {t('contact.desc')}
              </p>
            </div>

            {/* Quick links + Social */}
            <div className="space-y-4">
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">{t('nav.about')}</a>
                <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">{t('nav.contact')}</a>
                <a href="/candidates" className="text-muted-foreground transition-colors hover:text-foreground">{t('nav.candidates')}</a>
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">{t('nav.privacy')}</a>
              </nav>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/nordic_nomad_group/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:-translate-y-0.5"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 py-12 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle size={28} className="text-primary" />
                </div>
                <p className="font-display text-xl text-foreground">{t('contact.success')}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date().toLocaleString()}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-background p-6 md:p-8 shadow-[var(--shadow-soft)]">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t('contact.title')}
                </h3>
                <p className="text-sm text-muted-foreground -mt-2">{t('contact.response')}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    type="text"
                    placeholder={t('contact.name')}
                    className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                  <input
                    required
                    type="email"
                    placeholder={t('contact.email')}
                    className="w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  placeholder={t('contact.message')}
                  className="w-full resize-none rounded-xl border border-input bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                />

                <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
                  <input type="checkbox" required className="mt-0.5 accent-primary" />
                  <span className={isCyrillic ? 'cyrillic-text' : ''}>{t('contact.consent')}</span>
                </label>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {t('contact.send')}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container flex flex-col items-center justify-between gap-3 py-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Nordic Nomad Group. {t('footer.rights')}</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <CircleDot className="h-3 w-3 text-green-500" />
              {t('status.online')}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {t('status.response')}
            </span>

            <button
              onClick={scrollToTop}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:text-primary hover:-translate-y-0.5"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
