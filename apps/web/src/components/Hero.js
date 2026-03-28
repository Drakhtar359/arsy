import Image from "next/image";

export default function Hero() {
  return (
    <header style={styles.heroWrapper} id="home">
      <div style={styles.bgImage}>
        <Image 
          src="/hero.png" 
          alt="Fresh organic apples in an orchard" 
          fill 
          style={{ objectFit: 'cover', filter: 'brightness(0.7)' }}
          priority 
        />
      </div>
      <div className="container" style={styles.content}>
        <div style={styles.glassBox} className="glass">
          <h1 style={styles.title}>Най-вкусните ябълки в <span style={{color: 'var(--color-primary)'}}>България</span></h1>
          <p style={styles.subtitle}>
            100% натурално производство от чистия планински въздух на Първомай, Югозападна България.
          </p>
          <div style={styles.buttonGroup}>
            <a href="#products" className="btn btn-primary">Разгледай продуктите</a>
            <a href="#contact" className="btn btn-accent">Свържете се с нас</a>
          </div>
        </div>
      </div>
    </header>
  );
}

const styles = {
  heroWrapper: { position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' },
  bgImage: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 },
  content: { position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' },
  glassBox: { 
    textAlign: 'center', 
    maxWidth: '850px', 
    padding: '4rem 3rem', 
    borderRadius: '24px',
    boxShadow: 'var(--shadow-lg)',
    overflow: 'hidden'
  },
  title: { fontSize: '4rem', color: 'var(--color-text-main)', marginBottom: '1.5rem', lineHeight: 1.1 },
  subtitle: { fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontWeight: 500 },
  buttonGroup: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }
}
