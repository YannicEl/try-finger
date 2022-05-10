import {
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	WithFieldValue,
} from 'firebase/firestore';
import { User } from '~~/types/User';
import { UserDoc } from '~~/types/UserDoc';

const converter: FirestoreDataConverter<User> = {
	toFirestore: (e: WithFieldValue<User>) => e,
	fromFirestore: (snapshot: QueryDocumentSnapshot<UserDoc>) => {
		const { createdAt, updatedAt, name } = snapshot.data({
			serverTimestamps: 'estimate',
		});
		return new User(snapshot.ref, createdAt.toDate(), updatedAt.toDate(), name);
	},
};

export const useDbUser = () => {
	return useFirestore<User>('users', converter);
};
