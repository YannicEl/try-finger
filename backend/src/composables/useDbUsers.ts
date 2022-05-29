import { User } from '@try-finger/lib';
import { useFirestore } from './useFirestore.js';

export const useDbUsers = () => {
	const db = useFirestore<User>('users');

	return { ...db };
};
