import { useI18n } from '@/lib/i18n';
import { ArrowUp, Clock, CircleDot } from 'lucide-react';

const Footer = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-secondary/30 py-12">
      <div className="container max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-lg font-bold tracking-tight text-foreground font-display">
              Nordic Nomad Group
            </span>
            <p className="mt-1.5 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nordic Nomad Group. {t('footer.rights')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Lillemosevej 6, 4070 Kirke Hyllinge, Denmark · CVR: 44829363
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-6">
              <nav className="flex gap-5 text-sm text-muted-foreground">
                <a href="#about" className="transition-colors hover:text-foreground">{t('nav.about')}</a>
                <a href="#contact" className="transition-colors hover:text-foreground">{t('nav.contact')}</a>
                <a href="#" className="transition-colors hover:text-foreground">{t('nav.privacy')}</a>
              </nav>
              <button
                onClick={scrollToTop}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Back to top"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
