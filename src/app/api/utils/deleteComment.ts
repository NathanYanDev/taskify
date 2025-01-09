"use server";

import { db } from "@lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteComment(commentID: string, taskID: string) {
	const commentCollection = db.collection(
		process.env.MONGODB_COMMENT_COLLECTION as string,
	);

	const objId = new ObjectId(commentID);

	try {
		commentCollection.deleteOne({ _id: objId });

		revalidatePath(`/task/${taskID}`);
	} catch (error) {
		console.log(error);
	}
}
