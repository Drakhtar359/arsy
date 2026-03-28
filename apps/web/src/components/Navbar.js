export default function Navbar() {
  return (
    <nav style={styles.nav} className="glass">
      <div className="container" style={styles.navContainer}>
        <a href="#" style={styles.logo}>
          <span style={styles.logoGreen}>ARSY</span> Frucht
        </a>
        <div style={styles.navLinks}>
          <a href="#about" style={styles.link}>За Нас</a>
          <a href="#products" style={styles.link}>Продукти</a>
          <a href="#contact" style={styles.link}>Контакти</a>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: { position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, padding: '1rem 0' },
  navContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-main)', letterSpacing: '-0.05em' },
  logoGreen: { color: 'var(--color-primary)' },
  navLinks: { display: 'flex', gap: '2rem', fontWeight: '500' },
  link: { transition: 'var(--transition-normal)' }
}
