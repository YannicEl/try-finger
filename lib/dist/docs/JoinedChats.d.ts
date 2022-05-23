import { BaseDoc } from './BaseDoc';
export interface JoinedChats extends BaseDoc {
    name: string;
    lastMsg?: string;
}
