import { beforeEach, describe, expect, it } from 'vitest';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { getDoc, doc } from 'firebase/firestore';

beforeEach(async (context) => {
	const projectId = 'try-finger-dev';

	const app = await initializeTestEnvironment({
		projectId,
		firestore: { host: 'localhost', port: 8080 },
	});
	const db = app.unauthenticatedContext().firestore();

	context.app = app;
	context.db = db;
});

const unwrap = async (promise: Promise<any>): Promise<[res: any, error: any]> => {
	try {
		const data = await promise;
		return [data, null];
	} catch (err) {
		return [null, err];
	}
};

describe('firestore rules', () => {
	it('users should only be able to update their own user document', async ({ db }) => {
		const [res, error] = await unwrap(
			getDoc(doc(db, 'users/aHs3bc4D0Ge3OJhzIXai7dckqc921'))
		);

		expect(error?.code).toBe('permission-denied');
	});
});
