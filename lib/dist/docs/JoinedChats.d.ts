import { BaseDoc, SubCollection } from './BaseDoc.js';
export interface JoinedChats extends BaseDoc, SubCollection {
    parentCol: 'users';
    name: string;
}
