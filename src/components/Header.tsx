import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useI18n, languages } from '@/lib/i18n';
import logo from '@/assets/logo.jpeg';

const Header = () => {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: 'nav.about', href: '#about' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Nordic Nomad Group logo" className="h-[60px] w-auto" />
          <span className="text-2xl tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1B3A6B', fontWeight: 700 }}>
            Nordic Nomad Group
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center rounded-md border border-border bg-card p-0.5">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`rounded px-2 py-1 text-xs font-medium transition-all ${
                  lang === l.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
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
                className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {lang === 'ky' ? 'Каттоо' : 'Регистрация'}
              </a>
              <a
                href="/login"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden border-t border-border md:hidden"
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
              {(lang === 'ru' || lang === 'ky') && (
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  {lang === 'ky' ? 'Кирүү' : 'Войти'}
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
