import { createContext } from "react";

export const themeMode = {
    dark: {
        background: "linear-gradient(135deg, #1e1e2f, #121214)", // A smooth gradient with dark tones
        color: "#e0e0e0", // A soft white for better contrast
        cardBackground: "#2b2b3b", // Darker background for cards
        buttonBackground: "#3a3a4f", // Subtle dark button background
        buttonColor: "#ffffff", // Text on buttons remains white
        borderColor: "#5c5c72", // Slightly brighter border for visibility
        shadow: "0px 4px 10px rgba(0, 0, 0, 0.8)", // Subtle shadow for depth
    },
    light: { background: "white", color: "black" },
};

export const ThemeContext = createContext(themeMode.light);
