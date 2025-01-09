"use server";

import { db } from "@lib/mongodb";
import { ObjectId } from "mongodb";

export async function getTask(id: string) {
	try {
		const taskId = new ObjectId(id);
		const taskCollection = db.collection(
			process.env.MONGODB_COLLECTION as string,
		);

		const task = await taskCollection.findOne({ _id: taskId });

		return task;
	} catch (error) {
		console.log(error);
	}
}
