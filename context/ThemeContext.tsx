// context/ThemeContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";
import type { Theme, ThemeMode } from "../constants/theme";
import { darkTheme, lightTheme } from "../constants/theme";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

// ВАЖЛИВО: export (щоб useTheme міг імпортувати)
export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = mode === "dark";
    const theme = isDark ? darkTheme : lightTheme;

    return {
      mode,
      isDark,
      theme,
      setMode,
      toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// optional (можеш не юзати, якщо є useTheme.ts)
export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useThemeContext must be used inside ThemeProvider");
  return ctx;
}
