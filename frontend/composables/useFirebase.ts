import { initializeApp, getApp, FirebaseApp } from 'firebase/app';

let isInit = false;

export const useFirebase = (): FirebaseApp => {
	if (isInit) {
		return getApp();
	} else {
		const app = initializeApp(useRuntimeConfig().public.firebaseConfig);
		isInit = true;
		return app;
	}
};
