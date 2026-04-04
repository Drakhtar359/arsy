"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { Globe } from "lucide-react";

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <nav style={styles.nav} className="glass">
      <div className="container" style={styles.navContainer}>
        <a href="#" style={styles.logoLink}>
          <Image src="/logo.png" alt="ARSY Frucht" width={60} height={60} style={styles.logoImg} />
        </a>
        <div style={styles.rightSide}>
          <div style={styles.navLinks}>
            <a href="#about" style={styles.link}>{t("nav.about")}</a>
            <a href="#products" style={styles.link}>{t("nav.products")}</a>
            <a href="#contact" style={styles.link}>{t("nav.contact")}</a>
          </div>
          <button onClick={toggleLang} style={styles.langToggle} className="btn-lang" title="Change Language">
            <Globe size={18} />
            <span>{lang === "bg" ? "EN" : "БГ"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '1rem 0' },
  navContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoLink: { display: 'flex', alignItems: 'center' },
  logoImg: { objectFit: 'contain' },
  rightSide: { display: 'flex', alignItems: 'center', gap: '2rem' },
  navLinks: { display: 'flex', gap: '2rem', fontWeight: '500' },
  link: { transition: 'var(--transition-normal)' },
  langToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'transparent',
    border: '1px solid var(--color-primary)',
    color: 'var(--color-primary)',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'var(--transition-normal)'
  }
}
