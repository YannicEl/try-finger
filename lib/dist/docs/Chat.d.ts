import { BaseDoc, RootCollection } from './BaseDoc.js';
export interface Chat extends BaseDoc, RootCollection {
    name: string;
    creator: string;
    admins: string[];
    members: string[];
}
