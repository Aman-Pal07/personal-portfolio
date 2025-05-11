// Main theme colors
export const colors = {
  // Backgrounds
  bgPrimary: "#0A0A0A",
  bgSecondary: "#121212",
  
  // Text
  textPrimary: "#FAFAFA",
  textSecondary: "#AAAAAA",
  
  // Accent colors
  accentPrimary: "#39FF14", // Neon green
  accentSecondary: "#8A2BE2", // Purple
  
  // Utility colors
  border: "#222222",
  overlay: "rgba(10, 10, 10, 0.8)",
};

// Generate rgba from hex with opacity
export const hexToRgba = (hex: string, opacity: number): string => {
  // Remove the hash if it exists
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Return rgba string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Generate css variables for tailwind
export const getCssVariables = (): Record<string, string> => {
  return {
    '--color-bg-primary': colors.bgPrimary,
    '--color-bg-secondary': colors.bgSecondary,
    '--color-text-primary': colors.textPrimary,
    '--color-text-secondary': colors.textSecondary,
    '--color-accent-primary': colors.accentPrimary,
    '--color-accent-secondary': colors.accentSecondary,
    '--color-border': colors.border,
  };
};

// Gradients
export const gradients = {
  primaryGradient: `linear-gradient(90deg, ${colors.accentPrimary} 0%, ${colors.accentSecondary} 100%)`,
  darkGradient: `linear-gradient(180deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 100%)`,
  accentGradient: `linear-gradient(90deg, ${hexToRgba(colors.accentPrimary, 0.2)} 0%, ${hexToRgba(colors.accentSecondary, 0.2)} 100%)`,
};
