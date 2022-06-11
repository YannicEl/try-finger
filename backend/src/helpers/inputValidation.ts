import Ajv, { Schema, ValidateFunction } from 'ajv/dist/jtd.js';
import { logger } from 'firebase-functions/v2';
import { HttpsError } from 'firebase-functions/v2/https';

const ajv = new (Ajv as any)();

const cache = new Map<string, ValidateFunction>();

const getValidateFn = (key: string, schema: Schema): ValidateFunction => {
	if (!cache.has(key)) {
		const validate = ajv.compile(schema);
		cache.set(key, validate);
		return validate;
	}

	return cache.get(key)!;
};

export const validateData = (key: string, schema: Schema, data: any) => {
	const validate = getValidateFn(key, schema);

	if (!validate(data)) {
		logger.error('Function body not valid');
		logger.error(validate.errors);
		throw new HttpsError('internal', 'Internal Server Error');
	}
};
