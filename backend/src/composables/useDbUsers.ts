import { User } from '@try-finger/lib';
import { useFirestore } from './useFirestore';

export const useDbUsers = () => {
	const db = useFirestore<User>('users');

	return { ...db };
};
