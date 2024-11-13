import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"mc-gui-base": {
					DEFAULT: "#c6c6c6",
					dark: "#525252"
				},
				"mc-gui-slot": {
					DEFAULT: "#8b8b8b",
					dark: "#343434"
				}
			}
		},
	},
	plugins: [
		starlightPlugin(),
	],
}
