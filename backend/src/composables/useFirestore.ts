import {
	DocumentData,
	DocumentReference,
	FirestoreDataConverter,
	getFirestore,
	WriteResult,
	Query,
	Transaction,
} from 'firebase-admin/firestore';
import { Document, AddDoc, UpdateDoc } from '@try-finger/lib';
import { useFirebase } from './useFirebase.js';
import { serverTimestamp, snapshotToData } from '../helpers/firestore.js';

export const useFirestore = <T extends Document>(path: string) => {
	const converter: FirestoreDataConverter<T> = {
		toFirestore: (e: T): DocumentData => {
			const { id, parentCol, parentDoc, updatedAt, createdAt, ...rest } = e as any;

			return {
				...rest,
				createdAt: createdAt ? createdAt : serverTimestamp(),
				updatedAt: serverTimestamp(),
			};
		},
		fromFirestore: snapshotToData,
	};

	const db = getFirestore(useFirebase());
	const collection = db.collection(path).withConverter(converter);

	/**
	 * Add a document with random ID
	 */
	const add = (body: AddDoc<T>): Promise<DocumentReference<T>> => {
		return collection.add(body as T);
	};

	/**
	 * Same as add() but for use in a Transaction
	 */
	const addT = (body: AddDoc<T>, t: Transaction): Transaction => {
		return t.create(collection.doc(), body as T);
	};

	/**
	 * Set a document with given ID
	 */
	const set = (id: string, body: AddDoc<T>): Promise<WriteResult> => {
		return collection.doc(id).set(body as T);
	};

	/**
	 * Same as set() but for use in a Transaction
	 */
	const setT = (id: string, body: AddDoc<T>, t: Transaction): Transaction => {
		return t.set(collection.doc(id), body as T);
	};

	/**
	 * Update a document
	 */
	const update = (id: string, body: UpdateDoc<T>): Promise<WriteResult> => {
		return collection.doc(id).update(body);
	};

	/**
	 * Same as update() but for use in a Transaction
	 */
	const updateT = (id: string, body: UpdateDoc<T>, t: Transaction): void => {
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
