import { BaseDoc } from './BaseDoc';

export interface RoomDoc extends BaseDoc {
	name: string;
	members: string[];
}
