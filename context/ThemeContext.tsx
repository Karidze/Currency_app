import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import type { Theme, ThemeMode } from "../constants/theme";
import { darkTheme, lightTheme } from "../constants/theme";

type ThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

const defaultContextValue: ThemeContextValue = {
  mode: "light",
  isDark: false,
  theme: lightTheme,
  setMode: () => {},
  toggle: () => {},
};

export const ThemeContext = createContext<ThemeContextValue>(defaultContextValue);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggle = useCallback(() => {
    setMode((m) => (m === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = mode === "dark";
    return {
      mode,
      isDark,
      theme: isDark ? darkTheme : lightTheme,
      setMode,
      toggle,
    };
  }, [mode, toggle]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }
  return ctx;
}