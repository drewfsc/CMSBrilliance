"use client";

import React, { useEffect, useState } from 'react';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          transform: `translateY(${scrollY * 0.5}px)`,
          willChange: 'transform',
        }}
      />
      {/* Dark overlay for dimming effect */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-transparent" />
    </div>
  );
};

export default ParallaxBackground;
