import { region } from 'firebase-functions';
import handler from './srcTest.js';
import v2 from './srcV2.js';

export const test = {
	test: region('europe-west1').https.onRequest(handler),
	v2,
};
