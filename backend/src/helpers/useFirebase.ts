import { initializeApp, App } from 'firebase-admin/app';
import { getFirestore as _getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App;
export const useFirebase = (): App => {
	if (!app) {
		app = initializeApp();
	}

	return app;
};

let firestore: Firestore;
export const getFirestore = (): Firestore => {
	if (!firestore) {
		firestore = _getFirestore(useFirebase());
	}

	return firestore;
};
