import { logger, Response, Request } from 'firebase-functions';
import { add } from 'lib';

export const handler = async (req: Request, res: Response) => {
	logger.log(req.body);

	logger.log(add(1, 2));

	try {
		res.sendStatus(200);
		return;
	} catch (err) {
		logger.error(err);
		res.sendStatus(400);
		return;
	}
};
