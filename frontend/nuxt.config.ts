import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	buildModules: ['nuxt-windicss', '@unocss/nuxt', '@vueuse/nuxt'],

	runtimeConfig: {
		public: {
			firebaseConfig: {
				apiKey: process.env.NUXT_FIREBASE_API_KEY,
				authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
				projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
				storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
				messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
				appId: process.env.NUXT_FIREBASE_APP_ID,
			},
		},
	},

	unocss: {
		uno: false,
		icons: true,
		preflight: false,
	},

	meta: {
		link: [
			// fonts
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300..900&display=swap',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com/',
				crossorigin: true,
			},
		],
	},

	nitro: {
		preset: 'cloudflare',
	},

	css: ['~/main.scss'],
});
