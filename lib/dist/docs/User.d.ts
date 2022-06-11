import { BaseDoc, RootCollection } from './BaseDoc.js';
export interface User extends BaseDoc, RootCollection {
    name?: string;
}
