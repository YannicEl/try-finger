import { logger, Response, Request } from 'firebase-functions';

export const handler = async (req: Request, res: Response) => {
	logger.log(req.body);

	try {
		res.sendStatus(200);
		return;
	} catch (err) {
		logger.error(err);
		res.sendStatus(400);
		return;
	}
};
