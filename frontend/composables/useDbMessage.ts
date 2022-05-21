import { Message } from '~~/types/Message';

export const useDbMessage = (chatId: string) => {
	const db = useFirestore<Message>(`chats/${chatId}/messages`);  

	return { ...db };
};
