import { Message } from '@try-finger/lib';

export const useDbMessage = (chatId: string) => {
	const db = useFirestore<Message>(`chats/${chatId}/messages`);

	return { ...db };
};
