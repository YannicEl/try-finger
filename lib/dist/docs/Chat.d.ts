import { BaseDoc, RootCollection } from './BaseDoc';
export interface Chat extends BaseDoc, RootCollection {
    name: string;
    creator: string;
    admins: string[];
    members: string[];
}
