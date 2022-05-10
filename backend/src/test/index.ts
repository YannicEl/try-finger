import { region } from 'firebase-functions';
import { handler } from './srcTest.js';

export const createFunction = () => {
	return region('europe-west1').https;
};

export const test = {
	test: createFunction().onRequest(handler),
};
