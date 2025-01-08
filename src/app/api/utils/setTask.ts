"use server";

import { db } from "@lib/mongodb";
import type { TaskSchema } from "@src/schemas/taskSchema";
import { revalidatePath } from "next/cache";
import type { z } from "zod";

type Task = z.infer<typeof TaskSchema>;

export async function setTask(task: Task) {
	const taskCollection = db.collection(
		process.env.MONGODB_COLLECTION as string,
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
