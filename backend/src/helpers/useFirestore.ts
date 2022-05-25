import {
	DocumentData,
	DocumentReference,
	FirestoreDataConverter,
	getFirestore,
	QueryDocumentSnapshot,
	WriteResult,
	Query,
	Transaction,
} from 'firebase-admin/firestore';
import { BaseDoc, SubCollection, RootCollection } from '@try-finger/lib';
import { useFirebase } from './useFirebase.js';
import { serverTimestamp } from './fieldValues.js';

export const useFirestore = <T extends BaseDoc & (SubCollection | RootCollection)>(
	path: string
) => {
	const converter: FirestoreDataConverter<T> = {
		toFirestore: (e: T): DocumentData => e,
		fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): T => {
			const { createdAt, updatedAt, ...rest } = snapshot.data();

			return {
				id: snapshot.id,
				parentCol: snapshot.ref.parent?.parent?.parent?.id,
				parentDoc: snapshot.ref.parent?.parent?.id,
				createdAt: createdAt.toDate(),
				updatedAt: updatedAt.toDate(),
				...rest,
			} as T;
		},
	};

	const db = getFirestore(useFirebase());
	const collection = db.collection(path).withConverter(converter);

	const add = (body: T): Promise<DocumentReference<T>> => {
		return collection.add({
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	};

	const set = (id: string, body: T): Promise<WriteResult> => {
		return collection.doc(id).set({
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	};

	const update = (id: string, body: T, t?: Transaction): Promise<WriteResult> => {
		return collection.doc(id).update({
			...body,
			updatedAt: serverTimestamp(),
		});
	};

	const updateT = (id: string, body: T, t: Transaction): void => {
		t.update(collection.doc(id), body);
	};

	const get = (id: string): Promise<T | undefined> => {
		return collection
			.doc(id)
			.get()
			.then((e) => e?.data());
	};

	const getT = (id: string, t: Transaction): Promise<T | undefined> => {
		return t.get(collection.doc(id)).then((e) => e?.data());
	};

	const list = (query: (q: Query<T>) => Query<T> = (q) => q): Promise<T[]> => {
		const q = query(collection);
		return q.get().then((e) => e.docs.map((e) => e.data()));
	};

	const listT = (
		query: (q: Query<T>) => Query<T> = (q) => q,
		t: Transaction
	): Promise<T[]> => {
		const q = query(collection);
		return t.get(q).then((e) => e.docs.map((e) => e.data()));
	};

	const runTransaction = <F>(transaction: (t: Transaction) => Promise<F>): Promise<F> => {
		return db.runTransaction(transaction);
	};

	return {
		add,
		set,
		update,
		updateT,
		get,
		getT,
		list,
		listT,
		runTransaction,
	};
};
