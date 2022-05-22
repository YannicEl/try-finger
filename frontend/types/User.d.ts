import { BaseDoc } from './BaseDoc';
import { JoinedChats } from './joinedChats';

export interface User extends BaseDoc {
	name?: string;
}
