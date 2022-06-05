import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions/v1';

import Ajv, { ValidateFunction } from 'ajv/dist/jtd.js';
const ajv = new Ajv();

const cache = new Map<string, ValidateFunction>();

const getValidateFn = (key: string, schema: any): ValidateFunction => {
	if (!cache.has(key)) {
		const validate = ajv.compile(schema);
		cache.set(key, validate);
		return validate;
	}

	return cache.get(key)!;
};

export const defineHandler = <T = any, Return = any | Promise<any>>(
	schema: any,
	handler: (request: CallableRequest<T>) => Return
) => {
	return (request: CallableRequest<T>) => {
		const validate = getValidateFn(request.rawRequest.hostname, schema);

		if (!validate(request.data)) {
			logger.error('Function body not valid');
			logger.error(validate.errors);
			throw new HttpsError('internal', 'Internal Server Error');
		}

		return handler(request);
	};
};
