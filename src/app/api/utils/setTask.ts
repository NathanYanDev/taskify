"use server";

import { db } from "@lib/mongodb";
import { TaskFormSchema } from "@src/schemas/taskSchema";
import { UserInfoSchema } from "@src/schemas/userInfoSchema";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

const TaskSchema = TaskFormSchema.merge(UserInfoSchema);

type Task = z.infer<typeof TaskSchema>;

export async function setTask(task: Task) {
	const taskCollection = db.collection(
		process.env.MONGODB_TASK_COLLECTION as string,
	);

	if (task) {
		try {
			await taskCollection.insertOne(task);

			revalidatePath("/dashboard");
		} catch (error) {
			console.log(error);
		}
	}
}
