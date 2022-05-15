export interface Timestamp {
	toDate(): Date;
	toMillis(): number;
}

export interface BaseDoc {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
