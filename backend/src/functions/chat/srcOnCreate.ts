import { Chat } from '@try-finger/lib';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { EventContext, logger } from 'firebase-functions';
import { HttpsError } from 'firebase-functions/v1/auth';
import { snapshotToData } from '../../helpers/firestore.js';
import { runTransaction } from '../../helpers/runTransaction.js';
import { useDbJoinedChats } from '../../composables/useDbJoinedChats.js';

export default async (snapshot: QueryDocumentSnapshot, context: EventContext) => {
	const chat = snapshotToData<Chat>(snapshot);

	logger.info(chat);

	try {
		await runTransaction(async (t) => {
			chat.members.forEach((userId) => {
				const { setT } = useDbJoinedChats(userId);

				return setT(chat.id, { name: chat.name }, t);
			});
		});
	} catch (err) {
		logger.error(err);
		throw new HttpsError('internal', 'Internal Server Error');
	}
};
