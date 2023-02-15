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
					"primary": "#1EB854",
          "secondary": "#a99502",
					// "secondary": "#1FD65F",
					"accent": "#D99330",
          "neutral": "#f5f5f4",
          "base-100": "#e7e5e4",
					"info": "#3ABFF8",
					"success": "#36D399",
					"warning": "#FBBD23",
					"error": "#F87272",
				},
			},
		],
		base: true,
		utils: true,
		logs: true,
	},
};
