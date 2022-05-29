import { defineConfig } from 'vite-plugin-windicss';
import forms from 'windicss/plugin/forms';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
	theme: {
		extend: {
			screens: {
				'2xl': '1400px',
			},
			cursor: {
				'col-resize': 'col-resize',
			},
			colors: {
				'dark': '#12110f',
				'yellow-glow': '#5d5c50'
			}
		},
		container: {},
		fontFamily: {
			// sans: ['Montserrat', 'sans-serif'],
			serif: ['STIX Two Text', 'serif'],
		},
	},
	plugins: [forms, aspectRatio],
	safelist: [],
});
