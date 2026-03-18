import { useI18n } from '@/lib/i18n';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border pb-16 pt-16 relative">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <p className="font-display text-2xl tracking-tight text-foreground">
              <span className="font-bold">NORDIC</span>
              <span className="text-primary"> Nomad Group</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nordic Nomad Group. {t('footer.rights')}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Lillemosevej 6, 4070 Kirke Hyllinge, Denmark · CVR: 44829363
            </p>
          </div>

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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
