import { region } from 'firebase-functions';
import { handler as onCreate } from './srcOnCreate.js';

export const chat = {
	onCreate: region('europe-west1')
		.firestore.document('chats/{chatId}')
		.onCreate(onCreate),
};
