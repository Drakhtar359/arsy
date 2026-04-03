"use client";

import { Leaf } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section container">
      <h2 className="section-title">{t("about.title")}</h2>
      <div style={styles.aboutGrid}>
        <div style={styles.textContainer}>
          <p style={styles.paragraph} dangerouslySetInnerHTML={{ __html: t("about.p1") }}></p>
          <p style={styles.paragraph} dangerouslySetInnerHTML={{ __html: t("about.p2") }}></p>
          <p style={{ ...styles.paragraph, color: 'var(--color-primary)', fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: t("about.p3") }}></p>
        </div>
        <div style={styles.imagePlaceholder}>
          <div>
             <Leaf size={64} color="var(--color-primary)" style={{ display: 'block', margin: '0 auto 1rem auto' }} />
             <h3>{t("about.flagText")}</h3>
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
