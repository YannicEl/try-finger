import { logger } from 'firebase-functions/v1';
import { defineHandler } from '../../helpers/handler.js';
import { schema, V2 } from './schemas/v2.js';

export default defineHandler<V2>(schema, ({ data }) => {
	logger.info(data);

	return { lol: true };
});
