"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("bg");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && (savedLang === "bg" || savedLang === "en")) {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "bg" ? "en" : "bg";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (keyStr) => {
    const keys = keyStr.split(".");
    let result = translations[lang];
    for (const key of keys) {
      if (result[key] === undefined) {
        return keyStr;
      }
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
