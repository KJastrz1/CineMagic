import React, { useState, useEffect, createContext } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {

    const initialTheme = localStorage.getItem('theme') || 'light';
    document.querySelector('body').setAttribute('data-theme', initialTheme);
    const [theme, setTheme] = useState(initialTheme);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.querySelector('body').setAttribute('data-theme', newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

