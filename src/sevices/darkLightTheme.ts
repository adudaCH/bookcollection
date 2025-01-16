import { createContext } from "react";

export const themeMode = {
    dark: { background: "#191919", color: "white" },
    light: { background: " rgb(55, 198, 224)", color: "black" }
};

export const ThemeContext = createContext(themeMode.dark);
