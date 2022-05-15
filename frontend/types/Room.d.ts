import { BaseDoc } from './BaseDoc';

export interface Room extends BaseDoc {
	name: string;
	members: string[];
}
