import { logger } from 'firebase-functions/v1';
import { defineHandler } from '../../helpers/handler.js';
import { Data, schema } from './schemas/v2.js';

export default defineHandler<Data>({ schema }, ({ data }, { env }) => {
	logger.info(data);
	logger.info(env);

	return { lol: true };
});
