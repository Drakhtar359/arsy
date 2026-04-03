"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section container">
      <h2 className="section-title">{t("contact.title")}</h2>
      <div style={styles.contactWrapper} className="glass">
        <div style={styles.infoSide}>
          <h3 style={styles.subTitle}>{t("contact.subtitle")}</h3>
          <p style={styles.desc}>{t("contact.desc")}</p>
          <div style={styles.infoItem}>
            <span style={styles.icon}><Phone color="var(--color-primary-light)" size={32} /></span>
            <div>
              <strong style={{display: 'block'}}>{t("contact.phone")}</strong>
              <span>089 797 8534</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}><Mail color="var(--color-primary-light)" size={32} /></span>
            <div>
              <strong style={{display: 'block'}}>{t("contact.email")}</strong>
              <span>arsyfrucht@abv.bg</span>
            </div>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.icon}><MapPin color="var(--color-primary-light)" size={32} /></span>
            <div>
              <strong style={{display: 'block'}}>{t("contact.address")}</strong>
              <span>{t("contact.addressInfo")}</span>
            </div>
          </div>
        </div>
        
        <div style={styles.formSide}>
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t("contact.formName")}</label>
              <input type="text" className="input-field" placeholder={t("contact.formNamePlaceholder")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t("contact.formContact")}</label>
              <input type="text" className="input-field" placeholder={t("contact.formContactPlaceholder")} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>{t("contact.formMessage")}</label>
              <textarea className="input-field" rows="4" placeholder={t("contact.formMessagePlaceholder")}></textarea>
            </div>
            <button className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}}>
              {t("contact.formSubmit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const styles = {
  contactWrapper: { display: 'flex', flexWrap: 'wrap', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' },
  infoSide: { flex: '1 1 350px', backgroundColor: 'var(--color-primary)', color: 'white', padding: '4rem 3rem' },
  subTitle: { fontSize: '2rem', marginBottom: '1rem', color: 'white' },
  desc: { marginBottom: '3rem', color: 'var(--color-primary-light)', fontSize: '1.1rem' },
  infoItem: { display: 'flex', gap: '1.5rem', marginBottom: '2rem', alignItems: 'center' },
  icon: { display: 'flex' },
  formSide: { flex: '2 1 400px', padding: '4rem 3rem', backgroundColor: 'var(--color-bg-card)' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontWeight: '600', fontSize: '0.9rem', color: 'var(--color-text-main)' }
}
