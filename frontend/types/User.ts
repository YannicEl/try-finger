import { DocumentReference, UpdateData } from 'firebase/firestore';
import { Document } from './Documents';
import { UserDoc } from './UserDoc';

export class User extends Document {
	constructor(
		ref: DocumentReference<UserDoc>,
		createdAt: Date,
		updatedAt: Date,
		readonly name: string
	) {
		super(ref, createdAt, updatedAt);
	}

	update(data: UpdateData<UserDoc>) {
		this._update(data);
	}
}
