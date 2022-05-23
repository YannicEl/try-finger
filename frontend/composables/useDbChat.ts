import { Chat } from '@try-finger/lib';

export const useDbChat = () => {
	const db = useFirestore<Chat>('chats');

	return { ...db };
};
