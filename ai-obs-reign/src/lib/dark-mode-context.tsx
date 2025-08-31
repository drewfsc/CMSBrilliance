'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DarkModeContextType {
  isDark: boolean;
  toggle: () => void;
  setMode: (mode: 'light' | 'dark') => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

interface DarkModeProviderProps {
  children: ReactNode;
  forceMode?: 'light' | 'dark';
}

export function DarkModeProvider({ children, forceMode }: DarkModeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (forceMode) {
      setIsDark(forceMode === 'dark');
      document.documentElement.classList.toggle('dark', forceMode === 'dark');
    } else {
      // Check for saved preference or system preference
      const saved = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = saved ? JSON.parse(saved) : prefersDark;
      
      setIsDark(shouldBeDark);
      document.documentElement.classList.toggle('dark', shouldBeDark);
    }
  }, [forceMode]);

  const toggle = () => {
    if (forceMode) return; // Don't allow toggle when forced
    
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const setMode = (mode: 'light' | 'dark') => {
    if (forceMode) return; // Don't allow manual setting when forced
    
    const newMode = mode === 'dark';
    setIsDark(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggle, setMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}