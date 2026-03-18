import { useI18n } from '@/lib/i18n';
import { ArrowUp, Clock, CircleDot } from 'lucide-react';

const Footer = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border pb-16 pt-12 relative">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-2xl tracking-tight transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1B3A6B', fontWeight: 700 }}>
                Nordic Nomad Group
              </span>
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nordic Nomad Group. {t('footer.rights')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Lillemosevej 6, 4070 Kirke Hyllinge, Denmark · CVR: 44829363
            </p>
            <div className="mt-3 flex items-center gap-3">
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

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-8">
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
      </div>
    </footer>
  );
};

export default Footer;
