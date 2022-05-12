import { onRequest } from 'firebase-functions/v2/https';
import { handler } from './srcTest.js';

export const test = {
	test: onRequest({ region: 'europe-west1' }, handler),
};
