import { logger, Response, Request } from 'firebase-functions';
import { User, add } from 'lib';

export const handler = async (req: Request, res: Response) => {
	logger.log(req.body);

	const user: User = { name: '1' };

	logger.log(user);

	const sum = add(1, 2);

	logger.log(sum);

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
