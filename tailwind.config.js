import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			figtree: ["Figtree", "system-ui", "sans-serif"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			yogurt: {
				100: "#FEFDFC",
				80: "#FDF8F5",
				60: "#FBEEE7",
			},
			cocoa: {
				120: "#3E3734",
				100: "#645A57",
				80: "#857873",
			},
			accent: "#DB825C",
			lilac: "#BEA5CE",
			blurple: "#8882CA",
			shrub: "#74AE6E",
		},
		fontWeight: {
			regular: 400,
			medium: 500,
			semibold: 600,
			bold: 700,
		},
		screens: {
			"xs": "385px",
			"sm": "640px",
			"md": "768px",
			"lg": "1024px",
			"xl": "1280px",
			"2xl": "1536px",
			"tall": { raw: "(min-height: 900px)" },
		},
		extend: {
			spacing: {
				unset: "unset",
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						"--tw-prose-body": theme("colors.cocoa.100"),
						"--tw-prose-headings": theme("colors.cocoa.120"),
						"--tw-prose-lead": theme("colors.accent"),
						"--tw-prose-links": theme("colors.accent"),
						"--tw-prose-bullets": theme("colors.accent"),
						"h4": {
							// prose-h4:leading-10
							"lineHeight": "2.5rem",
							"--leading-offset": "calc((2.5rem - 1em) / -2)",
						},
					},
				},
			}),
		},
	},
	safelist: [
		{
			pattern: /[a-zA-Z]+-?(yogurt|cocoa|lilac|blurple|shrub|accent)(-[0-9]+)*/,
			variants: ["hover", "focus", "active", "disabled"],
		},
	],
	plugins: [formsPlugin, typographyPlugin],
};
