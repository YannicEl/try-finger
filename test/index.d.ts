import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import firebase from 'firebase/compat/app';

declare module 'vitest' {
	export interface TestContext {
		app: RulesTestEnvironment;
		db: firebase.firestore.Firestore;
		getAuthDb: (uid: string) => firebase.firestore.Firestore;
	}
}
