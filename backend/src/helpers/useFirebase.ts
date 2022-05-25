import { getApp, initializeApp, App } from 'firebase-admin/app';

let isInit = false;

export const useFirebase = (): App => {
	if (isInit) {
		return getApp();
	} else {
		const app = initializeApp();
		isInit = true;
		return app;
	}
};
