"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangContext";
import { CvModal } from "./Forms";

// lucide-react no longer ships brand icons, so LinkedIn and Instagram are inline
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Nav() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const contactHref = "/contact";
  // De Search-pagina opent met een volvlak blauwe hero, dus de nav is daar licht tot je scrolt
  const onDark = (pathname === "/productive-search" || pathname === "/productive-switch" || pathname === "/vision" || pathname === "/deelnemers" || pathname === "/contact" || pathname.startsWith("/blog")) && !scrolled && !menuOpen;

  const links = [
    { href: "/productive-switch", label: { nl: "Productive Switch", en: "Productive Switch" }, active: pathname === "/productive-switch" || pathname.startsWith("/richtingen") },
    { href: "/productive-search", label: { nl: "Productive Search", en: "Productive Search" }, active: pathname === "/productive-search" },
    { href: "/deelnemers", label: { nl: "Voor deelnemers", en: "For participants" }, active: pathname === "/deelnemers" },
    { href: "/vision", label: { nl: "De visie", en: "The vision" }, active: pathname === "/vision" },
  ];

  // Scroll zelf naar een #anchor als we al op de doelpagina staan
  const onHashClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    const [path, hash] = href.split("#");
    if (!hash) return;
    if (window.location.pathname === (path || "/")) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = (
    <>
      {links.map((l) => (
        <Link
          key={l.href}
          className={`nav-link${l.active ? " on" : ""}`}
          href={l.href}
          onClick={(e) => onHashClick(e, l.href)}
        >
          {t(l.label)}
        </Link>
      ))}
      <div className="lang">
        <button className={lang === "nl" ? "on" : ""} onClick={() => setLang("nl")}>
          NL
        </button>
        <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
          EN
        </button>
      </div>
    </>
  );

  const socials = (
    <>
      <a
        className="nav-social"
        href="https://www.linkedin.com/company/productiveswitch"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        className="nav-social"
        href="https://www.instagram.com/productiveswitch"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </a>
    </>
  );

  const navActions = (
    <>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          setMenuOpen(false);
          setCvOpen(true);
        }}
      >
        {t({ nl: "Upload CV", en: "Upload CV" })}
      </button>
      <Link className="btn btn-nav-contact btn-sm" href={contactHref} onClick={(e) => onHashClick(e, contactHref)}>
        Contact
      </Link>
    </>
  );

  return (
    <>
      <header className={`nav${scrolled ? " nav--scrolled" : ""}${menuOpen ? " nav--open" : ""}${onDark ? " nav--ondark" : ""}`}>
        <div className="nav-inner">
          <Link className="nav-brand" href="/">
            Productive<span className="dot">·</span>Switch
          </Link>
          <nav className="nav-links">{navLinks}</nav>
          <div className="nav-actions">{navActions}</div>
          <button
            className="nav-burger"
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="nav-menu">
          <div className="nav-menu-links">{navLinks}</div>
          <div className="nav-menu-actions">
            {socials}
            {navActions}
          </div>
        </div>
      </header>

      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} lang={lang} />
    </>
  );
}
