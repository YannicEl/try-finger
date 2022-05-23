import { BaseDoc } from './BaseDoc';
export interface Chat extends BaseDoc {
    name: string;
    members: string[];
}
