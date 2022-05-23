import { logger, Response, Request } from 'firebase-functions';
import { User } from 'lib';

export const handler = async (req: Request, res: Response) => {
	logger.log(req.body);

	const user: User = { name: '1' };

	logger.log(user);

	logger.log('lol');

	try {
		res.sendStatus(200);
		return;
	} catch (err) {
		logger.error(err);
		res.sendStatus(400);
		return;
	}
};
