import { DocumentReference, UpdateData } from 'firebase/firestore';
import { Document } from './Documents';
import { RoomDoc } from './RoomDoc';

export class Room extends Document {
	constructor(
		ref: DocumentReference<RoomDoc>,
		createdAt: Date,
		updatedAt: Date,
		readonly name: string,
		readonly members: string[]
	) {
		super(ref, createdAt, updatedAt);
	}

	update(data: UpdateData<RoomDoc>) {
		this._update(data);
	}
}
