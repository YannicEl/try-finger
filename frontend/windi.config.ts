import { defineConfig } from 'vite-plugin-windicss';
import forms from 'windicss/plugin/forms';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
	theme: {
		extend: {
			screens: {
				'2xl': '1400px',
			},
		},
		container: {},
		fontFamily: {
			sans: ['Montserrat', 'sans-serif'],
		},
	},
	plugins: [forms, aspectRatio],
	safelist: [],
});
