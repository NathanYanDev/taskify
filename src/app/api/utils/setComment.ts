"use server";

import { db } from "@lib/mongodb";
import { CommentFormSchema } from "@src/schemas/commentSchema";
import { UserInfoSchema } from "@src/schemas/userInfoSchema";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

const CommentSchema = CommentFormSchema.merge(UserInfoSchema);

type Comment = z.infer<typeof CommentSchema>;

export async function setComment(comment: Comment, id: string) {
	const commentCollection = db.collection(
		process.env.MONGODB_COMMENT_COLLECTION as string,
	);

	if (comment) {
		try {
			await commentCollection.insertOne(comment);

			revalidatePath(`/task/${id}`);
		} catch (error) {
			console.log(error);
		}
	}
}
