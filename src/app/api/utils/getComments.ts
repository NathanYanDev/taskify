"use server";

import { db } from "@lib/mongodb";
import type { CommentInfo } from "@src/schemas/commentSchema";

import type { z } from "zod";

export type Comment = z.infer<typeof CommentInfo>;

export type CommentWithID = Comment & {
	id: string;
};

export async function getComments(taskID: string) {
	try {
		const commentCollection = db.collection(
			process.env.MONGODB_COMMENT_COLLECTION as string,
		);

		const isEmpty = (await commentCollection.countDocuments()) < 1;

		if (isEmpty) return null;

		const commentsCursor = commentCollection
			.find({})
			.sort({ createdAt: -1 });
		const comments: CommentWithID[] = [];

		for await (const comment of commentsCursor) {
			if (taskID === comment.taskID) {
				const insertcomment = {
					id: comment._id.toString(),
					taskID: comment.taskID,
					comment: comment.comment,
					createdAt: comment.createdAt,
					createdBy: {
						name: comment.createdBy.name,
						email: comment.createdBy.email,
					},
				};

				comments.push(insertcomment);
			}
		}

		return comments;
	} catch (error) {
		console.log(error);
	}
}
