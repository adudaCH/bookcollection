import { createContext } from "react";

export const themeMode = {
    dark: {
        background:
            "radial-gradient(circle, rgba(174,217,255,1) 0%, rgba(96,119,140,1) 100%)",
        color: "white",
    },
    light: { background: "white", color: "black" },
};

export const ThemeContext = createContext(themeMode.light);
