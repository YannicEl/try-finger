import { afterAll, beforeEach, describe, it } from 'vitest';
import {
	initializeTestEnvironment,
	assertFails,
	assertSucceeds,
} from '@firebase/rules-unit-testing';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

beforeEach(async (context) => {
	const app = await initializeTestEnvironment({
		projectId: process.env.FIREBASE_PROJECT_ID,
		firestore: { host: 'localhost', port: 8080 },
	});
	context.app = app;

	context.db = app.unauthenticatedContext().firestore();

	context.getAuthDb = (uid: string) => {
		return app.authenticatedContext(uid).firestore();
	};

	// clear DB before every test
	app.clearFirestore();
});

describe('Collection: users/', () => {
	describe('unauth user', () => {
		it('cannot get', async ({ db }) => {
			await assertFails(getDoc(doc(db, 'users/doc')));
		});

		it('cannot list', async ({ db }) => {
			await assertFails(getDocs(query(collection(db, 'users'))));
		});

		it('cannot create', async ({ db }) => {
			await assertFails(setDoc(doc(db, 'users/doc'), {}));
		});

		it('cannot update', async ({ db }) => {
			await assertFails(updateDoc(doc(db, 'users/doc'), {}));
		});

		it('cannot delete', async ({ db }) => {
			await assertFails(deleteDoc(doc(db, 'users/doc')));
		});
	});

	describe('auth user', () => {
		const uid = 'myUid';

		it('can get own document', async ({ getAuthDb }) => {
			await assertSucceeds(getDoc(doc(getAuthDb(uid), `users/${uid}`)));
		});

		it('cannot get other document', async ({ getAuthDb }) => {
			await assertFails(getDoc(doc(getAuthDb(uid), 'users/theirUid')));
		});

		it('cannot list', async ({ db }) => {
			await assertFails(getDocs(query(collection(db, 'users'))));
		});

		it('can create own document with allowed fields', async ({ getAuthDb, app }) => {
			await assertSucceeds(setDoc(doc(getAuthDb(uid), `users/${uid}`), {}));

			await app.clearFirestore();

			await assertSucceeds(setDoc(doc(getAuthDb(uid), `users/${uid}`), { name: 'name' }));

			await app.clearFirestore();

			await assertFails(setDoc(doc(getAuthDb(uid), `users/${uid}`), { notAllowed: '1' }));
		});

		it('cannot create other document', async ({ getAuthDb }) => {
			await assertFails(setDoc(doc(getAuthDb(uid), `users/theirUid`), {}));
		});
	});
});
