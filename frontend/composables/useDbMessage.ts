import {
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	WithFieldValue,
} from 'firebase/firestore';
import { Message } from '~~/types/Message';
import { MessageDoc } from '~~/types/MessageDoc';

const converter: FirestoreDataConverter<Message> = {
	toFirestore: (e: WithFieldValue<Message>) => e,
	fromFirestore: (snapshot: QueryDocumentSnapshot<MessageDoc>) => {
		console.log(snapshot.data());
		const { createdAt, updatedAt, sender } = snapshot.data({
			serverTimestamps: 'estimate',
		});
		return new Message(snapshot.ref, createdAt.toDate(), updatedAt.toDate(), sender);
	},
};

export const useDbMessage = (roomId: string) => {
	return useFirestore<Message>(`${roomId}/messages`, converter);
};
