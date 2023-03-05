const themes = require("daisyui/src/colors/themes");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
		"node_modules/daisyui/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
		},
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
				fontFamily: {
					'sans': ['ui-sans-serif', 'system-ui'],
					'serif': ['ui-serif', 'Georgia',],
					'mono': ['ui-monospace', 'SFMono-Regular'],
					'display': ['Oswald'],
					'body': ['"Open Sans"'],
				  }
			},
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
						  fontFamily: {
							  'sans': ['ui-sans-serif', 'system-ui'],
							  'serif': ['ui-serif', 'Georgia',],
							  'mono': ['ui-monospace', 'SFMono-Regular'],
							  'display': ['Oswald'],
							  'body': ['"Open Sans"'],
							}

			}
		],
		base: true,
		utils: true,
		logs: true,
	},
};
