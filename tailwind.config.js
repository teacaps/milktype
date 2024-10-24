import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";
import containerQueriesPlugin from "@tailwindcss/container-queries";

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
				60: "#E9DDD6",
			},
			accent: "#E2794C",
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
			"2xs": "384px",
			"xs": "480px",
			"sm": "640px",
			"md": "768px",
			"lg": "1024px",
			"xl": "1280px",
			"2xl": "1536px",
			"3xl": "1920px",
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
			transitionTimingFunction: {
				bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
			},
			keyframes: {
				boogie: {
					"0%, 10%, 60%, 100%": {
						transform: "translateY(0)",
					},
					"40%": {
						transform: "translateY(-15px)",
					},
					"80%": {
						transform: "translateY(-15px)",
					},
				},
				bounce: {
					"0%, 100%": {
						transform: "translateY(0)",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
					},
					"20%, 75%": {
						transform: "translateY(-25%)",
						animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
					},
					"50%": {
						transform: "translateY(0)",
						animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
					},
				},
			},
			animation: {
				boogie: "boogie 2s ease-in-out infinite",
				bounce: "bounce 2s ease-in-out infinite",
			},
		},
	},
	plugins: [formsPlugin, typographyPlugin, containerQueriesPlugin],
};
