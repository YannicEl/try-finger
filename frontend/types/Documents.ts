import {
	DocumentReference,
	deleteDoc,
	updateDoc,
	UpdateData,
	serverTimestamp,
} from 'firebase/firestore';
import { BaseDoc } from './BaseDoc';

export abstract class Document {
	constructor(
		readonly ref: DocumentReference<BaseDoc>,
		readonly createdAt: Date,
		readonly updatedAt: Date
	) {}

	public get id() {
		return this.ref.id;
	}

	public async delete(): Promise<void> {
		return deleteDoc(this.ref);
	}

	protected _update<T extends BaseDoc>(data: UpdateData<T>): Promise<void> {
		return updateDoc(this.ref, { ...data, updatedAt: serverTimestamp() });
	}
}
