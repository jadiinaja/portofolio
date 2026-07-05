import { createContext, useContext } from "react";

export const ThemeCtx = createContext(null);
export const useTheme = () => useContext(ThemeCtx);
