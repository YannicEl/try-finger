import { Chat } from '~~/types/Chat';

export const useDbChat = () => {
	const db = useFirestore<Chat>('chats');

	return { ...db };
};
