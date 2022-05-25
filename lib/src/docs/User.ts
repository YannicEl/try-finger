import { BaseDoc, RootCollection } from './BaseDoc';

export interface User extends BaseDoc, RootCollection {
	name?: string;
}
