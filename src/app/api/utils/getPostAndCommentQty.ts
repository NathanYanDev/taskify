"use server";
import { db } from "@lib/mongodb";

export default async function getPostAndCommentQty() {
	const tasksCollection = db.collection(
		process.env.MONGODB_TASK_COLLECTION as string,
	);
	const commentsCollection = db.collection(
		process.env.MONGODB_COMMENT_COLLECTION as string,
	);

	const taskQty = await tasksCollection.countDocuments();
	const commentQty = await commentsCollection.countDocuments();

	return {
		taskQty,
		commentQty,
	};
}
