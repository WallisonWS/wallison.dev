// Paleta de cores principal
export const themeColors = {
  // Cores primárias
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1", // Cor principal - Indigo
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  // Cores de acento
  accent: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef", // Cor de acento - Fuchsia
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },
  // Cores neutras
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  // Cores de sucesso, erro, etc.
  success: "#10b981", // Emerald
  error: "#ef4444", // Red
  warning: "#f59e0b", // Amber
  info: "#0ea5e9", // Sky
}

// Configurações de tipografia
export const typography = {
  fontFamily: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
    display: "var(--font-display)",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
}

// Configurações de animação
export const animations = {
  transition: {
    fast: "all 0.2s ease",
    medium: "all 0.3s ease",
    slow: "all 0.5s ease",
  },
  easing: {
    default: [0.4, 0.0, 0.2, 1],
    smooth: [0.4, 0.0, 0.6, 1],
    bounce: [0.175, 0.885, 0.32, 1.275],
  },
}

// Configurações de layout
export const layout = {
  maxWidth: "1200px",
  containerPadding: {
    mobile: "1rem",
    tablet: "2rem",
    desktop: "2rem",
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
}

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

// Configurações de z-index
export const zIndex = {
  background: -10,
  default: 1,
  dropdown: 10,
  sticky: 100,
  fixed: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
}

