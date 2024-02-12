/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				scoh: "350px",
				scobl: "381px",
				xs: "475px",
				// => @media (min-width: 992px) { ... }
				"circles": "370px"
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
		},
		animation: {
			fadeIn: "fadeIn 0.5s linear",
		},
	},
	plugins: [],
};
