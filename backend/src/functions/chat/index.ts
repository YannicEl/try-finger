import { region } from 'firebase-functions';
import onCreate from './srcOnCreate.js';
import onUpdate from './srcOnUpdate.js';

export const chat = {
	onCreate: region('europe-west1')
		.firestore.document('chats/{chatId}')
		.onCreate(onCreate),

	onUpdate: region('europe-west1')
		.firestore.document('chats/{chatId}')
		.onUpdate(onUpdate),
};
