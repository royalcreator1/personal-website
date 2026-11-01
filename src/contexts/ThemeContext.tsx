'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { themeStorageKey, type Theme } from '@/lib/theme'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const explicitChoice = useRef(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout>>()

  const applyTheme = useCallback((next: Theme, animate = false) => {
    const root = document.documentElement
    clearTimeout(transitionTimer.current)
    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.setAttribute('data-theme-transition', '')
      transitionTimer.current = setTimeout(() => root.removeAttribute('data-theme-transition'), 240)
    } else {
      root.removeAttribute('data-theme-transition')
    }
    root.dataset.theme = next
    root.style.colorScheme = next
    root.classList.toggle('dark', next === 'dark')
    setTheme(next)
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)')
    try {
      const saved = localStorage.getItem(themeStorageKey)
      explicitChoice.current = saved === 'dark' || saved === 'light'
    } catch {}
    const initial = document.documentElement.dataset.theme
    applyTheme(initial === 'dark' || initial === 'light' ? initial : preference.matches ? 'dark' : 'light')

    const syncSystem = () => {
      if (!explicitChoice.current) applyTheme(preference.matches ? 'dark' : 'light')
    }
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== themeStorageKey && event.key !== null) return
      const saved = event.newValue
      explicitChoice.current = saved === 'dark' || saved === 'light'
      applyTheme(explicitChoice.current ? saved as Theme : preference.matches ? 'dark' : 'light')
    }
    preference.addEventListener('change', syncSystem)
    window.addEventListener('storage', syncStorage)
    return () => {
      preference.removeEventListener('change', syncSystem)
      window.removeEventListener('storage', syncStorage)
      clearTimeout(transitionTimer.current)
      document.documentElement.removeAttribute('data-theme-transition')
    }
  }, [applyTheme])

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    explicitChoice.current = true
    applyTheme(next, true)
    try { localStorage.setItem(themeStorageKey, next) } catch {}
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

