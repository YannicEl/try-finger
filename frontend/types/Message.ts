import { DocumentReference, UpdateData } from 'firebase/firestore';
import { Document } from './Documents';
import { MessageDoc } from './MessageDoc';

export class Message extends Document {
	constructor(
		ref: DocumentReference<MessageDoc>,
		createdAt: Date,
		updatedAt: Date,
		readonly sender: string
	) {
		super(ref, createdAt, updatedAt);
	}

	update(data: UpdateData<MessageDoc>) {
		this._update(data);
	}
}
