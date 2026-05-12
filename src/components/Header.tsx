import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Globe, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n, languages } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import flagBg from "@/assets/flag-bg.png";

const programs = [
  { key: "program.agriculture", href: "/programs/agriculture" },
  { key: "program.ausbildung", href: "/programs/ausbildung" },
  { key: "program.medical", href: "/programs/medical" },
];

const Header = () => {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const showPrograms = lang === "ru" || lang === "ky";

  const navItems = [
    { key: "nav.about", href: "/#about", isHash: true },
    { key: "nav.howitworks", href: "/how-it-works", isHash: false },
    ...(!showPrograms ? [{ key: "nav.services", href: "/candidates", isHash: false }] : []),
    { key: "nav.contact", href: "/#contact", isHash: true },
  ];

  const handleHashNav = (href: string) => {
    const hash = href.replace("/", "");
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl shadow-sm"
      style={{
        backgroundImage: `url(${flagBg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container flex h-[4.5rem] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <img src={logo} alt="Nordic Nomad Group" className="h-11 w-auto object-contain" />
          <span className="hidden sm:inline text-xl font-bold tracking-tight text-foreground font-display">
            Nordic Nomad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) =>
            item.isHash ? (
              <button
                key={item.key}
                onClick={() => handleHashNav(item.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </button>
            ) : (
              <Link
                key={item.key}
                to={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ),
          )}

          {showPrograms && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none">
                {t("nav.programs")}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[240px]">
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

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-secondary transition-colors">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{languages.find((l) => l.code === lang)?.label ?? "Dansk"}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
            <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-background shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    lang === l.code ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Auth buttons — RU/KY only */}
          {(lang === "ru" || lang === "ky") && (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/register"
                className="rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {lang === "ky" ? "Каттоо" : "Регистрация"}
              </Link>
              <Link
                to="/login"
                className="rounded-lg bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {lang === "ky" ? "Кирүү" : "Войти"}
              </Link>
            </div>
          )}

          {/* Mobile toggle */}
          <button className="ml-1 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="container flex flex-col gap-3 py-4">
              {navItems.map((item) =>
                item.isHash ? (
                  <button
                    key={item.key}
                    onClick={() => {
                      handleHashNav(item.href);
                      setMobileOpen(false);
                    }}
                    className="text-sm font-medium text-foreground text-left py-1"
                  >
                    {t(item.key)}
                  </button>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-foreground py-1"
                  >
                    {t(item.key)}
                  </Link>
                ),
              )}

              {showPrograms && (
                <div className="flex flex-col gap-1 border-t border-border pt-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    {t("nav.programs")}
                  </span>
                  {programs.map((p) => (
                    <Link
                      key={p.key}
                      to={p.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-foreground py-1 pl-2"
                    >
                      {t(p.key)}
                    </Link>
                  ))}
                </div>
              )}

              {(lang === "ru" || lang === "ky") && (
                <div className="flex gap-2 border-t border-border pt-3">
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg border border-border py-2 text-center text-sm font-medium text-foreground"
                  >
                    {lang === "ky" ? "Каттоо" : "Регистрация"}
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    {lang === "ky" ? "Кирүү" : "Войти"}
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
