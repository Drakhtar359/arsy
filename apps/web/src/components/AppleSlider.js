"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppleSlider() {
  const { t } = useLanguage();
  const applesList = t("apples.items") || [];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [visibleSlides, setVisibleSlides] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Determine how many slides are visible based on viewport
  useEffect(() => {
    const handleResize = () => {
      let slides = 1;
      if (window.innerWidth >= 1024) {
        slides = 4; // 4 items visible on desktop
      } else if (window.innerWidth >= 640) {
        slides = 2; // 2 items visible on tablet
      }
      setVisibleSlides(slides);
      
      // Initialize index to the start of real items (skipping clones)
      setTransitionEnabled(false);
      setCurrentIndex(slides);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applesList.length]);

  // Re-enable transition after reset jumps
  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  // extendedList has cloned items at the beginning and the end for seamless looping
  const extendedList = [
    ...applesList.slice(-visibleSlides),
    ...applesList,
    ...applesList.slice(0, visibleSlides)
  ];

  const totalExtended = extendedList.length;

  const handlePrev = () => {
    if (!transitionEnabled) return;
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!transitionEnabled) return;
    setCurrentIndex((prev) => prev + 1);
  };

  // Auto-play cycling (one direction: forward/right)
  useEffect(() => {
    if (!isPaused && applesList.length > 0 && transitionEnabled) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, applesList.length, transitionEnabled]);

  const handleTransitionEnd = () => {
    const realCount = applesList.length;
    
    // If we've scrolled past the last real item and finished animating the first clone
    if (currentIndex >= realCount + visibleSlides) {
      setTransitionEnabled(false);
      setCurrentIndex(visibleSlides); // Jump back to the first real item instantly
    }
    
    // If we've scrolled before the first real item and finished animating the last clone
    if (currentIndex < visibleSlides) {
      setTransitionEnabled(false);
      setCurrentIndex(realCount + visibleSlides - 1); // Jump to the last real item instantly
    }
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

  if (!applesList || applesList.length === 0) return null;

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
              transform: `translateX(-${currentIndex * (100 / totalExtended)}%)`,
              width: `${(totalExtended / visibleSlides) * 100}%`,
              transition: transitionEnabled ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
            className="slider-track"
          >
            {extendedList.map((apple, index) => (
              <div 
                key={index} 
                style={{ 
                  width: `${100 / totalExtended}%`,
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
        </div>

        {/* Dot Indicators */}
        <div style={styles.dotsContainer}>
          {Array.from({ length: applesList.length }).map((_, index) => {
            // Determine active dot based on current index relative to real items
            const activeIndex = (currentIndex - visibleSlides + applesList.length) % applesList.length;
            return (
              <button 
                key={index} 
                onClick={() => {
                  if (!transitionEnabled) return;
                  setCurrentIndex(index + visibleSlides);
                }}
                style={{
                  ...styles.dot,
                  backgroundColor: activeIndex === index ? 'var(--color-primary)' : 'rgba(0,0,0,0.15)',
                  width: activeIndex === index ? '24px' : '8px'
                }}
                className="slider-dot"
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
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
  track: { display: 'flex' },
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
    minHeight: '380px'
  },
  imageContainer: { position: 'relative', width: '100%', height: '240px', overflow: 'hidden' },
  cardContent: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' },
  cardTitle: { fontSize: '1.35rem', color: 'var(--color-text-main)', marginBottom: 0, fontWeight: '700' },
  varietyType: { fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold', padding: '0.2rem 0.6rem', backgroundColor: 'var(--color-primary-light)', borderRadius: '12px' },
  cardDesc: { fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.5', flexGrow: 1, margin: 0 },
  dotsContainer: { display: 'flex', gap: '0.5rem', marginTop: '2rem', justifyContent: 'center' },
  dot: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'var(--transition-normal)'
  }
};
