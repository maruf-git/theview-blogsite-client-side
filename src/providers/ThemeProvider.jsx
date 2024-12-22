import  { createContext, useState } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();
// eslint-disable-next-line react/prop-types
const ThemeProvider = ({children}) => {
    const [themeMode, setThemeMode] = useState("light");

    const handleThemeBtn = () => {
        if (themeMode === "light") {
            setThemeMode("dark");
        }
        else{
            setThemeMode("light");
        }
        
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        html.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
        // localStorage.getItem("theme") || "light"
        // localStorage.setItem("theme", currentTheme === 'light' ? 'light' : 'dark');
    }

    
    const themeInfo={
        themeMode,
        setThemeMode,
        handleThemeBtn
    }
    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;