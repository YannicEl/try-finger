export interface Timestamp {
	toDate(): Date;
	toMillis(): number;
}

export type Collection = 'users' | 'chats' | 'messages' | 'joinedChats';

export interface BaseDoc {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface SubCollection {
	parentCol: Collection;
	parentDoc: string;
}

export interface RootCollection {}
