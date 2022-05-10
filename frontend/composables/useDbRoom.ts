import {
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	WithFieldValue,
} from 'firebase/firestore';
import { Room } from '~~/types/Room';
import { RoomDoc } from '~~/types/RoomDoc';

const converter: FirestoreDataConverter<Room> = {
	toFirestore: (e: WithFieldValue<Room>) => e,
	fromFirestore: (snapshot: QueryDocumentSnapshot<RoomDoc>) => {
		console.log(snapshot.data());
		const { createdAt, updatedAt, name, members } = snapshot.data({
			serverTimestamps: 'estimate',
		});
		return new Room(snapshot.ref, createdAt.toDate(), updatedAt.toDate(), name, members);
	},
};

export const useDbRoom = () => {
	return useFirestore<Room>('rooms', converter);
};
