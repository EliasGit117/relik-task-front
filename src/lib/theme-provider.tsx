import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme,
  isDark: boolean,
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  isDark: false,
  setTheme: () => null
});

export function ThemeProvider(p: ThemeProviderProps) {
  const {
    children,
    defaultTheme = 'system',
    storageKey = 'theme',
    ...props
  } = p;

  const [theme, setTheme] =
    useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);
  const [isDark, setIsDark] =
    useState<boolean>( window.document.documentElement.classList.contains('dark'));

  const onMediaQueryChangeRed = useRef((e: MediaQueryListEvent) => {
    const isMediaDark = e.matches;

    setIsDark(isMediaDark);
    const docEl = window.document.documentElement;
    docEl.classList.remove('light', 'dark');
    docEl.classList.add((isMediaDark ? 'dark' : 'light'));
  });

  const removeListener = () => window
    .matchMedia('(prefers-color-scheme: dark)')
    .removeEventListener('change', onMediaQueryChangeRed.current);


  const addListener = () => window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', onMediaQueryChangeRed.current);

  const isMediaDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  useEffect(() => {
    const docEl = window.document.documentElement;
    docEl.classList.remove('light', 'dark');

    if (theme === 'system') {
      docEl.classList.add(isMediaDark() ? 'dark' : 'light');
      addListener();
    } else {
      removeListener();
      docEl.classList.add(theme);
      setIsDark(theme === 'dark');
    }

    return () => {
      removeListener();
    }
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    isDark,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
