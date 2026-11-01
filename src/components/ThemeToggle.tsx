'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Dark theme" aria-pressed={theme === 'dark'} title={label}>
      <Moon className="theme-icon theme-icon-moon" size={17} strokeWidth={1.6} aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun" size={18} strokeWidth={1.6} aria-hidden="true" />
    </button>
  )
}
