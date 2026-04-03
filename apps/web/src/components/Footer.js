"use client";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.brand}>
          <h3 style={{...styles.logo, color: 'white'}}><span style={{color: 'var(--color-primary-light)'}}>ARSY</span> Frucht</h3>
          <p style={styles.text}>{t("footer.desc")}</p>
        </div>
        <div style={styles.socials}>
          <a href="https://www.facebook.com/arsyfrucht/" target="_blank" rel="noopener noreferrer" className="social-link">
            {t("footer.fb")}
          </a>
        </div>
      </div>
      <div style={styles.bottom}>
        <p>&copy; {year} ARSY Frucht. {t("footer.rights")}</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: { backgroundColor: 'var(--color-text-main)', color: 'white', paddingTop: '4rem' },
  container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' },
  brand: { flex: '1' },
  logo: { fontSize: '1.75rem', marginBottom: '0.5rem', letterSpacing: '-0.05em' },
  text: { color: '#9CA3AF' },
  socials: { display: 'flex', gap: '1rem' },
  bottom: { borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', padding: '2rem 0', color: '#9CA3AF', fontSize: '0.875rem' }
}
