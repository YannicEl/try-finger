import { logger, Response, Request } from 'firebase-functions';
import { User } from '@try-finger/lib';

export const handler = async (req: Request, res: Response) => {
	logger.log(req.body);

	const user: User = { createdAt: new Date(), updatedAt: new Date(), id: '', name: '1' };

	logger.log(user);

	// const sum = add(1, 2);

	// logger.info(sum);

	logger.log('!lol!');

	try {
		res.sendStatus(200);
		return;
	} catch (err) {
		logger.error(err);
		res.sendStatus(400);
		return;
	}
};
