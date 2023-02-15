const themes = require('daisyui/src/colors/themes')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "node_modules/daisyui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      { mytheme: {
          
        "primary": "#40332e",
                 
        "secondary": "#a1df50",
                 
        "accent": "#cba8a3",
                 
        "neutral": "#f9f7eb",
                 
        "base-100": "#f5f5f4",
                 
        "info": "#2563EB",
                 
        "success": "#16A34A",
                 
        "warning": "#D97706",
                 
        "error": "#DC2626",
                 },
               },
    ],
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
  },
}
