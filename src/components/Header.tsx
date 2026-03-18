import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useI18n, languages } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.jpeg';

const programs = [
  { key: 'program.agriculture', href: '/programs/agriculture' },
  { key: 'program.ausbildung', href: '/programs/ausbildung' },
  { key: 'program.medical', href: '/programs/medical' },
];

const Header = () => {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const showPrograms = lang === 'ru' || lang === 'ky';

  const navItems = [
    { key: 'nav.about', href: '/#about' },
    { key: 'nav.services', href: '/candidates' },
    { key: 'nav.contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-18 items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src={logo} alt="Nordic Nomad Group logo" className="h-[56px] w-auto rounded-lg shadow-sm transition-transform group-hover:scale-105" />
          <span className="text-2xl tracking-tight transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1B3A6B', fontWeight: 700 }}>
            Nordic Nomad Group
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground animated-underline"
            >
              {t(item.key)}
            </a>
          ))}

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
                    <a href={p.href} className="cursor-pointer">
                      {t(p.key)}
                    </a>
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
              <a
                href="/register"
                className="rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:-translate-y-0.5"
              >
                {lang === 'ky' ? 'Каттоо' : 'Регистрация'}
              </a>
              <a
                href="/login"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5"
              >
                {lang === 'ky' ? 'Кирүү' : 'Войти'}
              </a>
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
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground"
                >
                  {t(item.key)}
                </a>
              ))}

              {/* Programs in mobile — RU/KY only */}
              {showPrograms && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-foreground">{t('nav.programs')}</span>
                  {programs.map((p) => (
                    <a
                      key={p.key}
                      href={p.href}
                      onClick={() => setMobileOpen(false)}
                      className="pl-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t(p.key)}
                    </a>
                  ))}
                </div>
              )}

              {(lang === 'ru' || lang === 'ky') && (
                <>
                  <a
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-primary px-4 py-2 text-center text-sm font-medium text-primary"
                  >
                    {lang === 'ky' ? 'Каттоо' : 'Регистрация'}
                  </a>
                  <a
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    {lang === 'ky' ? 'Кирүү' : 'Войти'}
                  </a>
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
