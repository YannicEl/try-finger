import { logger, Response, Request } from 'firebase-functions';
import { runTransaction } from '../../helpers/runTransaction.js';
import { useDbUsers } from '../../composables/useDbUsers.js';
import { useDbMessages } from '../../composables/useDbMessages.js';

export const handler = async (req: Request, res: Response) => {
	try {
		const uid = 'GLeYV5SDD4e8WqseXPrky5KVz2B2';
		const chatId = '8mnNQLUiZg4kq5GBCHAq';
		const messageId = 'scxUBW2qyNls0IE2SA0W';

		const dbUser = useDbUsers();
		const dbMessage = useDbMessages(chatId);

		const user = await dbUser.get(uid);
		const message = await dbMessage.get(messageId);

		await runTransaction(async (t) => {
			const user = await dbUser.getT(uid, t);

			dbUser.updateT(uid, { name: user?.name + 'Yannic' }, t);
		});

		res.json({ user, message });
		return;
	} catch (err) {
		logger.error(err);
		res.sendStatus(400);
		return;
	}
};
