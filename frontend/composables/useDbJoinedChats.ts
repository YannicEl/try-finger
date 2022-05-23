import { JoinedChats } from '@try-finger/lib';

export const useDbJoinedChats = (uid: string) => {
	const db = useFirestore<JoinedChats>(`users/${uid}/joinedChats`);

	return { ...db };
};
