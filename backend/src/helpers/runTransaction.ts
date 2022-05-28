import { Transaction } from 'firebase-admin/firestore';
import { getFirestore } from './useFirebase.js';

export const runTransaction = <F>(
	transaction: (t: Transaction) => Promise<F>
): Promise<F> => {
	return getFirestore().runTransaction(transaction);
};
