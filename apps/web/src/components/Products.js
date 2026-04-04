"use client";

import { useLanguage } from "../context/LanguageContext";
import { Apple, CupSoda, FlaskConical, Wine } from "lucide-react";

export default function Products() {
  const { t } = useLanguage();
  const rawItems = t("products.items");

  const products = [
    { 
      title: rawItems[0]?.title, 
      icon: <Apple size={40} color="white" />, 
      desc: rawItems[0]?.desc,
      bg: "/apples-bg.png"
    },
    { 
      title: rawItems[1]?.title, 
      icon: <CupSoda size={40} color="white" />, 
      desc: rawItems[1]?.desc,
      bg: "/juice-bg.png"
    },
    { 
      title: rawItems[2]?.title, 
      icon: <FlaskConical size={40} color="white" />, 
      desc: rawItems[2]?.desc,
      bg: "/vinegar-bg.png"
    },
    { 
      title: rawItems[3]?.title, 
      icon: <Wine size={40} color="white" />, 
      desc: rawItems[3]?.desc,
      bg: "/rakia-bg.png"
    }
  ];

  return (
    <section id="products" className="section container">
      <h2 className="section-title">{t("products.title")}</h2>
      
      <div className="expand-container">
        {products.map((p, i) => (
          <div key={i} className="expand-card">
            <div className="expand-bg" style={{ backgroundImage: `url(${p.bg})` }}></div>
            <div className="expand-overlay"></div>
            
            <div className="expand-closed">
              <div className="expand-icon">{p.icon}</div>
              <h3 className="expand-title">{p.title}</h3>
            </div>
            
            <div className="expand-content">
              <div className="expand-icon-small">{p.icon}</div>
              <h3 className="expand-title-large">{p.title}</h3>
              <p className="expand-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
