import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore();

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative flex items-center gap-2 px-2 py-1.5 rounded-full cursor-pointer transition-colors duration-300
        ${theme === 'dark' ? 'bg-surface border border-white/10' : 'bg-gray-200 border border-gray-300'}
      `}
            aria-label="Toggle Theme"
        >
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`
          absolute w-7 h-7 rounded-full shadow-md flex items-center justify-center z-10
          ${theme === 'dark' ? 'bg-primary left-1' : 'bg-white right-1'}
        `}
            >
                {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-black fill-current" />
                ) : (
                    <Sun className="w-4 h-4 text-orange-500 fill-current" />
                )}
            </motion.div>

            {/* Background Icons for context */}
            <div className="flex justify-between items-center w-16 px-1">
                <Sun className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'opacity-0'}`} />
                <Moon className={`w-4 h-4 ${theme === 'light' ? 'text-gray-400' : 'opacity-0'}`} />
            </div>
        </button>
    );
};

export default ThemeToggle;
