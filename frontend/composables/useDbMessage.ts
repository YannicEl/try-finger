import { Message } from '~~/types/Message';

export const useDbMessage = (roomId: string) => {
	const db = useFirestore<Message>(`${roomId}/messages`);

	return { ...db };
};
