
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

type ThemeType = "light" | "dark";
type ColorTheme = "blue" | "purple" | "green" | "amber" | "rose";

interface ThemeContextType {
  theme: ThemeType;
  colorTheme: ColorTheme;
  setTheme: (theme: ThemeType) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("oremus-theme") as ThemeType;
      if (savedTheme) return savedTheme;
      
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    // Check for saved color theme preference
    if (typeof window !== "undefined") {
      const savedColorTheme = localStorage.getItem("oremus-color-theme") as ColorTheme;
      if (savedColorTheme) return savedColorTheme;
    }
    return "blue";
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem("oremus-theme", newTheme);
  };

  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme);
    localStorage.setItem("oremus-color-theme", newColorTheme);
    toast(`${newColorTheme.charAt(0).toUpperCase() + newColorTheme.slice(1)} theme applied`);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark");
    
    // Apply color theme
    document.documentElement.classList.remove("theme-blue", "theme-purple", "theme-green", "theme-amber", "theme-rose");
    if (colorTheme !== "blue") {
      document.documentElement.classList.add(`theme-${colorTheme}`);
    }
  }, [theme, colorTheme]);

  return (
    <ThemeContext.Provider value={{ theme, colorTheme, setTheme, setColorTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
