import { JoinedChats } from '~~/types/joinedChats';

export const useDbJoinedChats = (uid: string) => {
	const db = useFirestore<JoinedChats>(`users/${uid}/joinedChats`);

	return { ...db };
};
