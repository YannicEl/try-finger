import { BaseDoc, SubCollection } from './BaseDoc';

export interface JoinedChats extends BaseDoc, SubCollection {
	parentCol: 'users';
	name: string;
}
