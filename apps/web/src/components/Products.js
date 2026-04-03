"use client";

import { Apple, CupSoda, FlaskConical, Wine } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Products() {
  const { t } = useLanguage();
  const rawItems = t("products.items");

  const products = [
    { title: rawItems[0]?.title, icon: <Apple size={48} color="var(--color-primary)" />, desc: rawItems[0]?.desc },
    { title: rawItems[1]?.title, icon: <CupSoda size={48} color="var(--color-primary)" />, desc: rawItems[1]?.desc },
    { title: rawItems[2]?.title, icon: <FlaskConical size={48} color="var(--color-primary)" />, desc: rawItems[2]?.desc },
    { title: rawItems[3]?.title, icon: <Wine size={48} color="var(--color-primary)" />, desc: rawItems[3]?.desc }
  ];

  return (
    <section id="products" className="section container">
      <h2 className="section-title">{t("products.title")}</h2>
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
  icon: { marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90px', height: '90px', margin: '0 auto 1.5rem auto', backgroundColor: 'var(--color-bg)', borderRadius: '50%' },
  cardTitle: { fontSize: '1.25rem', marginBottom: '1rem' },
  cardDesc: { fontSize: '1rem', color: 'var(--color-text-muted)' }
}
