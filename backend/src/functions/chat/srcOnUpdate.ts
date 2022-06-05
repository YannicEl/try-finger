import { Chat } from '@try-finger/lib';
import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { Change, EventContext, logger } from 'firebase-functions/v1';
import { HttpsError } from 'firebase-functions/v1/auth';
import { snapshotToData } from '../../helpers/firestore.js';
import { updatedDiff } from 'deep-object-diff';
import { useDbJoinedChats } from '../../composables/useDbJoinedChats.js';
import { runTransaction } from '../../helpers/runTransaction.js';

export default async (change: Change<QueryDocumentSnapshot>, context: EventContext) => {
	const before = snapshotToData<Chat>(change.before);
	const after = snapshotToData<Chat>(change.after);
	const updated = updatedDiff(before, after) as Partial<Chat>;

	logger.info('before --------');
	logger.info(before);

	logger.info('after ---------');
	logger.info(after);

	logger.info('updated --------');
	logger.info(updated);

	try {
		if (updated.name) {
			await runTransaction(async (t) => {
				after.members.forEach((userId) => {
					const { updateT } = useDbJoinedChats(userId);

					return updateT(after.id, { name: after.name }, t);
				});
			});
		}
	} catch (err) {
		logger.error(err);
		throw new HttpsError('internal', 'Internal Server Error');
	}
};
