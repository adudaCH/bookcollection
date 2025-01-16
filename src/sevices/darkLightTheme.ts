import { createContext, useState } from "react";

export const ThemeContext = createContext({
    background: "white",
    color: "black",
    toggleTheme: () => {},
});

export const themeMode = {
    dark: { background: "black", color: "white" },
    light: { background: "white", color: "black" },
    toggleTheme: () => {},
};
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const theme = isDarkMode
        ? { background: "#000000", color: "#ffffff" } // Dark mode
        : { background: "#ffffff", color: "#000000" }; // Light mode
};
