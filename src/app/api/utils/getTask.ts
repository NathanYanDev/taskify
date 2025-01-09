"use server";

import { db } from "@lib/mongodb";
import { ObjectId } from "mongodb";
import type { TaskWithId } from "./getTasks";

export async function getTask(id: string) {
	try {
		const taskId = new ObjectId(id);
		const taskCollection = db.collection(
			process.env.MONGODB_COLLECTION as string,
		);

		const taskFromDB = await taskCollection.findOne({ _id: taskId });

		if (!taskFromDB) return null;

		const task: TaskWithId = {
			id: taskFromDB._id.toString(),
			task: taskFromDB.task,
			createdAt: taskFromDB.createdAt,
			createdBy: {
				name: taskFromDB.createdBy.name,
				email: taskFromDB.createdBy.email,
			},
			isPublic: taskFromDB.isPublic,
		};

		return task;
	} catch (error) {
		console.log(error);
	}
}
