import { region } from 'firebase-functions/';
import { handler } from './srcTest.js';

export const test = {
	test: region('europe-west1').https.onRequest(handler),
};
