import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && 
                        window.matchMedia('(prefers-color-scheme: light)').matches;
    
    const shouldUseLightTheme = saved === 'light' || (!saved && prefersLight);
    
    if (shouldUseLightTheme) {
      root.classList.add('light');
      setIsDarkTheme(false);
    } else {
      root.classList.remove('light');
      setIsDarkTheme(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const willBeLight = !root.classList.contains('light');
    
    root.classList.toggle('light', willBeLight);
    localStorage.setItem('theme', willBeLight ? 'light' : 'dark');
    setIsDarkTheme(!willBeLight);
  };

  return { isDarkTheme, toggleTheme };
};