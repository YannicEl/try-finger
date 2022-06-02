import { beforeEach, describe, it } from 'vitest';
import { initializeTestEnvironment, assertFails } from '@firebase/rules-unit-testing';
import { getDoc, doc } from 'firebase/firestore';

beforeEach(async (context) => {
	console.log(process.env.FIREBASE_PROJECT_ID);
	const projectId = process.env.FIREBASE_PROJECT_ID;

	const app = await initializeTestEnvironment({
		projectId,
		firestore: { host: 'localhost', port: 8080 },
	});
	const db = app.unauthenticatedContext().firestore();

	context.app = app;
	context.db = db;
});

describe('firestore rules', () => {
	it('users should only be able to update their own user document', async ({ db }) => {
		await assertFails(getDoc(doc(db, 'users/aHs3bc4D0Ge3OJhzIXai7dckqc92')));
	});
});
