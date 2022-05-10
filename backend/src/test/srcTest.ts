import { logger, Response } from 'firebase-functions';
import { Request } from 'firebase-functions/lib/providers/https';

export async function handler(req: Request, res: Response) {
	logger.log(req.body);

	try {
		res.sendStatus(200);
		return;
	} catch (err) {
		logger.error(err);
		res.sendStatus(400);
		return;
	}
}
