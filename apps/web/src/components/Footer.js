"use client";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logoWrapper}>
            <Image src="/logo.png" alt="ARSY Frucht" width={90} height={90} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          </div>
          <p style={styles.text}>{t("footer.desc")}</p>
        </div>
        <div style={styles.socials}>
          <a href="https://www.facebook.com/arsyfrucht/" target="_blank" rel="noopener noreferrer" className="social-link">
            {t("footer.fb")}
          </a>
        </div>
      </div>
      <div style={styles.bottom}>
        <p style={{ marginBottom: '0.5rem' }}>&copy; {year} ARSY Frucht. {t("footer.rights")}</p>
        <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>
          {t("footer.developedBy")} <a href="https://mozuk.net" target="_blank" rel="noopener noreferrer" style={styles.mozukLink}>MOZUK</a> &copy; 2026 - {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: { backgroundColor: 'var(--color-text-main)', color: 'white', paddingTop: '4rem' },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' },
  brand: { flex: '1' },
  logoWrapper: { marginBottom: '1rem' },
  text: { color: '#9CA3AF' },
  socials: { display: 'flex', gap: '1rem' },
  bottom: { borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', padding: '2rem 0', color: '#9CA3AF', fontSize: '0.875rem' },
  mozukLink: { color: 'var(--color-primary-light)', textDecoration: 'none', fontWeight: 'bold' }
}
