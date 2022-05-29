import { Message } from '@try-finger/lib';
import { useFirestore } from './useFirestore';

export const useDbMessages = (chatId: string) => {
	const db = useFirestore<Message>(`chats/${chatId}/messages`);

	return { ...db };
};
