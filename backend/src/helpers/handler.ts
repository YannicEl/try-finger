import { Schema } from 'ajv/dist/jtd.js';
import { logger } from 'firebase-functions';
import { CallableRequest, HttpsError, onCall } from 'firebase-functions/v2/https';
import { EnvVars, getEnvVars, Secret, Secrets } from './environment.js';
import { validateData } from './inputValidation.js';

interface HandlerOptions {
	schema?: Schema;
	secrets?: Secret[];
}

interface HandlerContext {
	env: EnvVars & Secrets;
}

export const defineHandler = <T = any, Return = any | Promise<any>>(
	{ schema, secrets = [] }: HandlerOptions,
	handler: (request: CallableRequest<T>, ctx: HandlerContext) => Return
) => {
	return onCall({ region: 'europe-west1', secrets }, (request: CallableRequest<T>) => {
		try {
			if (schema) validateData(request.rawRequest.hostname, schema, request.data);

			const env = getEnvVars(secrets);

			return handler(request, { env });
		} catch (err) {
			logger.error(err);
			throw new HttpsError('internal', 'Internal Server Error');
		}
	});
};
