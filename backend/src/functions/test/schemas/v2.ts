import { JTDDataType } from 'ajv/dist/jtd.js';

export const schema = {
	properties: {
		foo: { type: 'int32' },
	},
	optionalProperties: {
		bar: { type: 'string' },
	},
} as const;

export type V2 = JTDDataType<typeof schema>;
