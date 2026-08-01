"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppleSlider() {
  const { t } = useLanguage();
  const applesList = t("apples.items") || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Determine how many slides are visible per page based on viewport
  useEffect(() => {
    const handleResize = () => {
      let slides = 1;
      if (window.innerWidth >= 1024) {
        slides = 4; // 4 items per page on desktop
      } else if (window.innerWidth >= 640) {
        slides = 2; // 2 items per page on tablet (results in 4 pages)
      }
      setVisibleSlides(slides);
      
      const pageCount = Math.ceil(applesList.length / slides);
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, pageCount - 1)));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applesList.length]);

  // Group apples list into pages
  const pages = [];
  for (let i = 0; i < applesList.length; i += visibleSlides) {
    pages.push(applesList.slice(i, i + visibleSlides));
  }

  // Auto-play cycling
  useEffect(() => {
    if (!isPaused && pages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= pages.length - 1 ? 0 : prev + 1));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, pages.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!applesList || applesList.length === 0 || pages.length === 0) return null;

  return (
    <section id="apples" className="section container" style={styles.section}>
      <h2 className="section-title">{t("apples.title")}</h2>
      
      <div 
        style={styles.sliderWrapper}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons */}
        <button onClick={handlePrev} style={{ ...styles.navButton, left: '-15px' }} className="slider-nav-btn" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} style={{ ...styles.navButton, right: '-15px' }} className="slider-nav-btn" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Carousel Track Container */}
        <div style={styles.trackContainer}>
          <div 
            style={{ 
              ...styles.track, 
              transform: `translateX(-${currentIndex * (100 / pages.length)}%)`,
              width: `${pages.length * 100}%` 
            }}
            className="slider-track"
          >
            {pages.map((pageItems, pageIndex) => (
              <div 
                key={pageIndex} 
                style={{ 
                  display: 'flex',
                  width: `${100 / pages.length}%`,
                  flexShrink: 0
                }}
                className="slider-page"
              >
                {pageItems.map((apple, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      width: `${100 / visibleSlides}%`,
                      padding: '0 0.75rem',
                      flexShrink: 0
                    }}
                    className="slider-slide"
                  >
                    <div style={styles.card} className="slider-card glass">
                      <div style={styles.imageContainer}>
                        <Image 
                          src={apple.img} 
                          alt={apple.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          style={{ objectFit: "cover" }} 
                        />
                      </div>
                      <div style={styles.cardContent}>
                        <div style={styles.cardHeader}>
                          <h3 style={styles.cardTitle}>{apple.name}</h3>
                          <span style={styles.varietyType}>{apple.type}</span>
                        </div>
                        <p style={styles.cardDesc}>{apple.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div style={styles.dotsContainer}>
          {Array.from({ length: pages.length }).map((_, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)}
              style={{
                ...styles.dot,
                backgroundColor: currentIndex === index ? 'var(--color-primary)' : 'rgba(0,0,0,0.15)',
                width: currentIndex === index ? '24px' : '8px'
              }}
              className="slider-dot"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { overflow: 'hidden', paddingBottom: '4rem', position: 'relative' },
  sliderWrapper: { position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  navButton: {
    position: 'absolute',
    top: '45%',
    transform: 'translateY(-50%)',
    backgroundColor: 'var(--color-bg-glass)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0,0,0,0.1)',
    color: 'var(--color-primary)',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    boxShadow: 'var(--shadow-md)',
    transition: 'var(--transition-bounce)'
  },
  trackContainer: { width: '100%', overflow: 'hidden', padding: '1rem 0' },
  track: { display: 'flex', transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    transition: 'var(--transition-normal)',
    backgroundColor: 'var(--color-bg-card)',
    border: '1px solid rgba(255,255,255,0.4)',
    minHeight: '450px'
  },
  imageContainer: { position: 'relative', width: '100%', height: '240px', overflow: 'hidden' },
  cardContent: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' },
  cardTitle: { fontSize: '1.35rem', color: 'var(--color-text-main)', marginBottom: 0, fontWeight: '700' },
  varietyType: { fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold', padding: '0.2rem 0.6rem', backgroundColor: 'var(--color-primary-light)', borderRadius: '12px' },
  cardDesc: { fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.5', flexGrow: 1, margin: 0 },
  cardMeta: { display: 'flex', gap: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1rem', marginTop: 'auto' },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '0.15rem' },
  metaLabel: { fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  metaValue: { fontSize: '0.95rem', color: 'var(--color-text-main)', fontWeight: '600' },
  dotsContainer: { display: 'flex', gap: '0.5rem', marginTop: '2rem', justifyContent: 'center' },
  dot: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'var(--transition-normal)'
  }
};
