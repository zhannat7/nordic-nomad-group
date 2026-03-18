import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useI18n, languages } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.png';

const programs = [
  { key: 'program.agriculture', href: '/programs/agriculture' },
  { key: 'program.ausbildung', href: '/programs/ausbildung' },
  { key: 'program.medical', href: '/programs/medical' },
];

const Header = () => {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const showPrograms = lang === 'ru' || lang === 'ky';

  const navItems = [
    { key: 'nav.about', href: '/#about', isHash: true },
    { key: 'nav.services', href: '/candidates', isHash: false },
    { key: 'nav.contact', href: '/#contact', isHash: true },
  ];

  const handleHashNav = (href: string) => {
    const hash = href.replace('/', '');
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl shadow-[0_1px_3px_0_hsl(var(--foreground)/0.04)]">
      <div className="container flex h-24 items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative flex-shrink-0">
            <img
              src={logo}
              alt="Nordic Nomad Group logo"
              className="h-[76px] w-auto object-contain transition-all duration-300 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-[22px] leading-tight tracking-[-0.01em] font-extrabold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#0F2B52',
                letterSpacing: '-0.02em',
              }}
            >
              Nordic Nomad
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Group
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) =>
            item.isHash ? (
              <button
                key={item.key}
                onClick={() => handleHashNav(item.href)}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground animated-underline"
              >
                {t(item.key)}
              </button>
            ) : (
              <Link
                key={item.key}
                to={item.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground animated-underline"
              >
                {t(item.key)}
              </Link>
            )
          )}

          {/* Programs dropdown — RU/KY only */}
          {showPrograms && (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none animated-underline">
                {t('nav.programs')}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[260px]">
                {programs.map((p) => (
                  <DropdownMenuItem key={p.key} asChild>
                    <Link to={p.href} className="cursor-pointer">
                      {t(p.key)}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center rounded-lg border border-border/70 bg-card/50 p-0.5 backdrop-blur-sm">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Login & Register buttons - only RU and KY */}
          {(lang === 'ru' || lang === 'ky') && (
            <>
              <Link
                to="/register"
                className="rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:-translate-y-0.5"
              >
                {lang === 'ky' ? 'Каттоо' : 'Регистрация'}
              </Link>
              <Link
                to="/login"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
              >
                {lang === 'ky' ? 'Кирүү' : 'Войти'}
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] as const }}
            className="overflow-hidden border-t border-border/50 md:hidden"
          >
            <nav className="container flex flex-col gap-4 py-6">
              {navItems.map((item) =>
                item.isHash ? (
                  <button
                    key={item.key}
                    onClick={() => { handleHashNav(item.href); setMobileOpen(false); }}
                    className="text-sm font-medium text-foreground text-left"
                  >
                    {t(item.key)}
                  </button>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-foreground"
                  >
                    {t(item.key)}
                  </Link>
                )
              )}

              {/* Programs in mobile — RU/KY only */}
              {showPrograms && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">{t('nav.programs')}</span>
                  {programs.map((p) => (
                    <Link
                      key={p.key}
                      to={p.href}
                      onClick={() => setMobileOpen(false)}
                      className="pl-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(p.key)}
                    </Link>
                  ))}
                </div>
              )}

              {(lang === 'ru' || lang === 'ky') && (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-primary px-4 py-2 text-center text-sm font-medium text-primary"
                  >
                    {lang === 'ky' ? 'Каттоо' : 'Регистрация'}
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    {lang === 'ky' ? 'Кирүү' : 'Войти'}
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
