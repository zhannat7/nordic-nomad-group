import { useI18n } from '@/lib/i18n';

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border pb-14 pt-12">
      <div className="container flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <p className="font-display text-lg tracking-tight text-foreground">
            <span className="font-bold">NORDIC</span>
            <span className="text-primary"> Nomad Group</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nordic Nomad Group. {t('footer.rights')}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Lillemosevej 6, 4070 Kirke Hyllinge, Denmark · CVR: 44829363
          </p>
        </div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#services" className="hover:text-foreground">{t('footer.services_link')}</a>
          <a href="#about" className="hover:text-foreground">{t('nav.about')}</a>
          <a href="#contact" className="hover:text-foreground">{t('nav.contact')}</a>
          <a href="#" className="hover:text-foreground">{t('nav.privacy')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
