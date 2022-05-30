import { region } from 'firebase-functions';
import { handler as onCreate } from './srcOnCreate.js';
import { handler as onUpdate } from './srcOnUpdate.js';

export const chat = {
	onCreate: region('europe-west1')
		.firestore.document('chats/{chatId}')
		.onCreate(onCreate),

	onUpdate: region('europe-west1')
		.firestore.document('chats/{chatId}')
		.onUpdate(onUpdate),
};
