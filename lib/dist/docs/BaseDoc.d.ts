export interface Timestamp {
    toDate(): Date;
    toMillis(): number;
}
export declare type Collection = 'users' | 'chats' | 'messages' | 'joinedChats';
export interface BaseDoc {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface SubCollection {
    parentCol: Collection;
    parentDoc: string;
}
export interface RootCollection {
}
export declare type Document = (BaseDoc | RootCollection) & (BaseDoc | SubCollection);
export declare type AddDoc<T> = Omit<T, 'id' | 'parentCol' | 'parentDoc' | 'createdAt' | 'updatedAt'>;
export declare type UpdateDoc<T> = Partial<Omit<T, 'id' | 'parentCol' | 'parentDoc' | 'createdAt' | 'updatedAt'>>;
