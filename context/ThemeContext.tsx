// context/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react'
import { lightTheme, darkTheme } from '../styles/ThemesStyle'

type ThemeContextType = {
  theme: typeof lightTheme
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false)

  function toggleTheme() {
    setIsDark(prev => !prev)
  }

  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
