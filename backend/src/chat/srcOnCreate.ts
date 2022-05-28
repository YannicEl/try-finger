import { Chat, JoinedChats } from '@try-finger/lib';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { EventContext, logger } from 'firebase-functions';
import { HttpsError } from 'firebase-functions/v1/auth';
import { snapshotToData } from '../helpers/db.js';
import { runTransaction } from '../helpers/runTransaction.js';
import { useFirestore } from '../helpers/useFirestore.js';

export const handler = async (snapshot: QueryDocumentSnapshot, context: EventContext) => {
	const chat = snapshotToData<Chat>(snapshot);

	logger.info(chat);

	try {
		await runTransaction(async (t) => {
			chat.members.forEach((uid) => {
				const { setT } = useFirestore<JoinedChats>(`users/${uid}/joinedChats`);

				return setT(
					chat.id,
					{
						name: chat.name,
					} as JoinedChats,
					t
				);
			});
		});
	} catch (err) {
		logger.error(err);
		throw new HttpsError('internal', 'Internal Server Error');
	}
};
