export default function Products() {
  const products = [
    { title: "Пресни Ябълки", icon: "🍎", desc: "Свежи сортове ябълки от нашите градини, отгледани с любов и грижа към природата." },
    { title: "100% Натурален Сок", icon: "🧃", desc: "Студено пресован сок (ябълка; ябълка, цвекло и моркови) в удобни Bag-in-Box опаковки без захар." },
    { title: "Натурален Оцет", icon: "🥗", desc: "Истински, жив плодов оцет, запазил всички полезни свойства на плода." },
    { title: "Традиционна Ракия", icon: "🥃", desc: "Еликсир за ценители – традиционна ракия, дестилирана от прецизно подбрани плодове." }
  ];

  return (
    <section id="products" className="section container">
      <h2 className="section-title">Нашите Продукти</h2>
      <div style={styles.grid}>
        {products.map((p, i) => (
          <div key={i} className="product-card glass" style={styles.card}>
            <div style={styles.icon}>{p.icon}</div>
            <h3 style={styles.cardTitle}>{p.title}</h3>
            <p style={styles.cardDesc}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' },
  card: { padding: '2.5rem 1.5rem', borderRadius: '16px', textAlign: 'center' },
  icon: { fontSize: '3rem', marginBottom: '1.5rem', display: 'inline-block', padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '50%' },
  cardTitle: { fontSize: '1.25rem', marginBottom: '1rem' },
  cardDesc: { fontSize: '1rem', color: 'var(--color-text-muted)' }
}
