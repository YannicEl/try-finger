import { BaseDoc, SubCollection } from './BaseDoc';
export interface Message extends BaseDoc, SubCollection {
    parentCol: 'chats';
    sender: string;
    message: string;
}
