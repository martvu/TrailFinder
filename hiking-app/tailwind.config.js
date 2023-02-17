const themes = require("daisyui/src/colors/themes");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/daisyui/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		styled: true,
		themes: [
			{
				trailfinder_light: {
          "primary": "#1eb854",
          "secondary": "#40332e",
          "accent": "#cba8a3",
          "neutral": "#f9f7eb",
          "base-100": "#f5f5f5",
          "info": "#2563EB",
          "success": "#16A34A",
          "warning": "#D97706",
          "error": "#DC2626",
				},
			},
		],
		base: true,
		utils: true,
		logs: true,
	},
};
