import { beforeEach, describe, it } from 'vitest';
import { initializeTestEnvironment, assertFails } from '@firebase/rules-unit-testing';
import { getDoc, doc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

beforeEach(async (context) => {
	const app = await initializeTestEnvironment({
		projectId: process.env.FIREBASE_PROJECT_ID,
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
