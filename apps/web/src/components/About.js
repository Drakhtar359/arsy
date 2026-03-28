export default function About() {
  return (
    <section id="about" className="section container">
      <h2 className="section-title">За Нас</h2>
      <div style={styles.aboutGrid}>
        <div style={styles.textContainer}>
          <p style={styles.paragraph}>
            Добре дошли в <strong>ARSY Frucht</strong>! Ние сме горди производители на най-вкусните ябълки в България. Нашите овощни градини се намират в сърцето на живописния регион на Първомай, където чистият планински въздух и благоприятният климат създават перфектните условия за отглеждане на първокачествени плодове.
          </p>
          <p style={styles.paragraph}>
            Нашата мисия е да предложим на трапезата ви 100% натурални и здравословни продукти. От брането на свежите ябълки до производството на нашите студено пресовани сокове, органичен оцет и традиционна ракия &mdash; ние спазваме най-високите стандарти за качество и безкомпромисност към вкуса.
          </p>
          <p style={{ ...styles.paragraph, color: 'var(--color-primary)', fontWeight: 600 }}>
            ARSY Frucht &ndash; от градината директно във вашия дом.
          </p>
        </div>
        <div style={styles.imagePlaceholder}>
          <div>
             <span style={{fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🍏</span>
             <h3>Натурално Производство</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  aboutGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginTop: '3rem' },
  textContainer: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  paragraph: { fontSize: '1.125rem', lineHeight: 1.8},
  imagePlaceholder: { width: '100%', height: '100%', minHeight: '350px', backgroundColor: 'var(--color-primary-light)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--color-primary-dark)' }
}
