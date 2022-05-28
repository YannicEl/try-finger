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
import { snapshotToData } from './db.js';

export const useFirestore = <
	T extends (BaseDoc & SubCollection) | (BaseDoc & RootCollection)
>(
	path: string
) => {
	const converter: FirestoreDataConverter<T> = {
		toFirestore: (e: T): DocumentData => e,
		fromFirestore: snapshotToData,
	};

	const db = getFirestore(useFirebase());
	const collection = db.collection(path).withConverter(converter);

	/**
	 * Add a document with random ID
	 */
	const add = (body: T): Promise<DocumentReference<T>> => {
		return collection.add({
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	};

	/**
	 * Same as add() but for use in a Transaction
	 */
	const addT = (body: T, t: Transaction): Transaction => {
		return t.create(collection.doc(), {
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	};

	/**
	 * Set a document with given ID
	 */
	const set = (id: string, body: T): Promise<WriteResult> => {
		return collection.doc(id).set({
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	};

	/**
	 * Same as set() but for use in a Transaction
	 */
	const setT = (id: string, body: T, t: Transaction): Transaction => {
		console.log({
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});

		return t.set(collection.doc(id), {
			...body,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	};

	/**
	 * Update a document
	 */
	const update = (id: string, body: T): Promise<WriteResult> => {
		return collection.doc(id).update({
			...body,
			updatedAt: serverTimestamp(),
		});
	};

	/**
	 * Same as update() but for use in a Transaction
	 */
	const updateT = (id: string, body: T, t: Transaction): void => {
		t.update(collection.doc(id), body);
	};

	/**
	 * Get a single document
	 */
	const get = (id: string): Promise<T | undefined> => {
		return collection
			.doc(id)
			.get()
			.then((e) => e?.data());
	};

	/**
	 * Same as get() but for use in a Transaction
	 */
	const getT = (id: string, t: Transaction): Promise<T | undefined> => {
		return t.get(collection.doc(id)).then((e) => e?.data());
	};

	/**
	 * Query the collection
	 */
	const list = (query: (q: Query<T>) => Query<T> = (q) => q): Promise<T[]> => {
		const q = query(collection);
		return q.get().then((e) => e.docs.map((e) => e.data()));
	};

	/**
	 * Same as list() but for use in a Transaction
	 */
	const listT = (
		query: (q: Query<T>) => Query<T> = (q) => q,
		t: Transaction
	): Promise<T[]> => {
		t.get;
		const q = query(collection);
		return t.get(q).then((e) => e.docs.map((e) => e.data()));
	};

	const cleanBody = (
		body: any
	): Omit<Partial<T>, 'id' | 'createdAt' | 'updatedAt' | 'parentCol' | 'parentDoc'> => {
		const { id, createdAt, updatedAt, parentCol, parentDoc, ...rest } = body || {};
		return rest;
	};

	return {
		add,
		addT,
		set,
		setT,
		update,
		updateT,
		get,
		getT,
		list,
		listT,
	};
};
