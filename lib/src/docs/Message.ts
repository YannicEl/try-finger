import { BaseDoc, SubCollection } from './BaseDoc.js';

export interface Message extends BaseDoc, SubCollection {
	parentCol: 'chats';
	sender: string;
	message: string;
}
