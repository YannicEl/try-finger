import { Document } from '@try-finger/lib';
import { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';

export const snapshotToData = <T extends Document>(
	snapshot: QueryDocumentSnapshot<DocumentData>
): T => {
	const { createdAt, updatedAt, ...rest } = snapshot.data();

	return {
		...rest,
		id: snapshot.id,
		parentCol: snapshot.ref.parent?.parent?.parent?.id,
		parentDoc: snapshot.ref.parent?.parent?.id,
		createdAt: createdAt.toDate(),
		updatedAt: updatedAt.toDate(),
	} as T;
};
