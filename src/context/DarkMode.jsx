// context/DarkMode.jsx
import { createContext, useState, useEffect } from "react";

// Buat context
export const DarkModeContext = createContext();

// Buat provider
export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Coba ambil dari localStorage jika ada
        const saved = localStorage.getItem('darkMode');
        const initialValue = saved ? JSON.parse(saved) : false;
        return initialValue;
    });

    // Function untuk toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            
            // Simpan ke localStorage
            localStorage.setItem('darkMode', JSON.stringify(newValue));
            
            return newValue;
        });
    };

    // Debug: Log setiap perubahan state
    useEffect(() => {
        console.log("🎯 Dark Mode State Changed:", isDarkMode);
    }, [isDarkMode]);

    const contextValue = { 
        isDarkMode, 
        setIsDarkMode,
        toggleDarkMode 
    };

    console.log("🔥 Context Value:", contextValue);

    return (
        <DarkModeContext.Provider value={contextValue}>
            {children}
        </DarkModeContext.Provider>
    );
};

// Export context untuk digunakan di komponen
export default DarkModeContext;