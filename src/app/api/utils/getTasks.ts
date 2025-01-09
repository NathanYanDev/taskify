"use server";

import { db } from "@lib/mongodb";

import type { TaskSchema } from "@src/schemas/taskSchema";
import type { z } from "zod";

export type Task = z.infer<typeof TaskSchema>;

export type TaskWithId = Task & {
	id: string;
};

export async function getTasks(currentUserEmail: string) {
	try {
		const taskCollection = db.collection(
			process.env.MONGODB_COLLECTION as string,
		);

		const isEmpty = (await taskCollection.countDocuments()) < 1;

		if (isEmpty) return null;

		const tasksCursor = taskCollection.find({}).sort({ createdAt: -1 });
		const tasks: TaskWithId[] = [];

		for await (const task of tasksCursor) {
			if (task.createdBy.email === currentUserEmail) {
				const insertTask = {
					id: task._id.toString(),
					task: task.task,
					createdAt: task.createdAt,
					createdBy: {
						name: task.createdBy.name,
						email: task.createdBy.email,
					},
					isPublic: task.isPublic,
				};

				tasks.push(insertTask);
			}
		}

		return tasks;
	} catch (error) {
		console.log(error);
	}
}
