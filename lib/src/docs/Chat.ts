import { BaseDoc, RootCollection } from './BaseDoc.js';

export interface Chat extends BaseDoc, RootCollection {
	name: string;

	// userId of chat creator
	creator: string;

	// array of userIds
	admins: string[];

	// array of userIds
	members: string[];
}
