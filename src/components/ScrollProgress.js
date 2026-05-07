import React, { useEffect, useState } from 'react';

/**
 * 2026 SCROLL PROGRESS INDICATOR
 * A sleek, minimal top bar that tracks narrative progress.
 */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.detail && typeof e.detail.progress === 'number') {
        setProgress(e.detail.progress);
      }
    };

    window.addEventListener('motion-scroll', handleScroll);
    return () => window.removeEventListener('motion-scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left transition-transform duration-100 ease-out"
        style={{ 
          transform: `scaleX(${progress})`,
          boxShadow: '0 0 12px rgba(139, 92, 246, 0.5)'
        }}
      />
    </div>
  );
};

export default ScrollProgress;
