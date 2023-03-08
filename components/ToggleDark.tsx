import { useTheme } from 'next-themes';
import { FaMoon, FaSun, } from 'react-icons/fa';
import React from 'react';

interface DarkModeButtonProps {
  className?: string;
}



export default function DarkModeButton({ className }: DarkModeButtonProps) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === 'trailfinder_light' ? 'trailfinder_dark' : 'trailfinder_light');
  }

  return (
    <button onClick={toggleTheme} className={`flex items-center justify-center gap-2 py-1 px-2 btn btn-xs rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${className}`}>
      {theme === 'trailfinder_light' ? <FaMoon /> : <FaSun />}
      <span>{theme === 'trailfinder_light' ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
}
