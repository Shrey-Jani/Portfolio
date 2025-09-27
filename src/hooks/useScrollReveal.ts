import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.reveal');
    
    if (!prefersReduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
      );
      
      revealEls.forEach((el) => io.observe(el));
      
      return () => {
        revealEls.forEach((el) => io.unobserve(el));
      };
    } else {
      revealEls.forEach((el) => el.classList.add('in'));
    }
  }, []);
};