// constants/theme.ts
export type ThemeMode = "light" | "dark";

export type Theme = {
  colors: {
    background: string;
    text: string;
    mutedText: string;

    card: string;
    border: string;

    primary: string;
    primaryText: string;

    inputBg: string;
    inputBorder: string;
    placeholder: string;

    danger: string;
    success: string;
  };

  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };

  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };

  typography: {
    title: number;
    subtitle: number;
    body: number;
    caption: number;
  };
};

export const lightTheme: Theme = {
  colors: {
    background: "#FFFFFF",
    text: "#111111",
    mutedText: "#6B7280",

    card: "#FFFFFF",
    border: "#E5E7EB",

    primary: "#1D0DA1",
    primaryText: "#FFFFFF",

    inputBg: "#F9FAFB",
    inputBorder: "#D1D5DB",
    placeholder: "#9CA3AF",

    danger: "#DC2626",
    success: "#16A34A",
  },

  spacing: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 },

  radius: { sm: 10, md: 12, lg: 16, xl: 22, pill: 999 },

  typography: { title: 28, subtitle: 18, body: 16, caption: 13 },
};

export const darkTheme: Theme = {
  colors: {
    background: "#0B0B0F",
    text: "#FFFFFF",
    mutedText: "#A1A1AA",

    card: "#111118",
    border: "#2A2A33",

    primary: "#1D0DA1",
    primaryText: "#FFFFFF",

    inputBg: "#12121A",
    inputBorder: "#2A2A33",
    placeholder: "#71717A",

    danger: "#F87171",
    success: "#4ADE80",
  },

  spacing: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24 },

  radius: { sm: 10, md: 12, lg: 16, xl: 22, pill: 999 },

  typography: { title: 28, subtitle: 18, body: 16, caption: 13 },
};
