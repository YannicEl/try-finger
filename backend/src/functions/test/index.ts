import { region } from 'firebase-functions';
import { onCall } from 'firebase-functions/v2/https';
import handler from './srcTest.js';
import v2 from './srcV2.js';

export const test = {
	test: region('europe-west1').https.onRequest(handler),
	v2: onCall({ region: 'europe-west1', invoker: 'private' }, v2),
};
