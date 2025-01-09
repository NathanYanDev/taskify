"use server";

import { db } from "@lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function deleteTask(id: string) {
	const taskCollection = db.collection(
		process.env.MONGODB_COLLECTION as string,
	);

	const objId = new ObjectId(id);

	try {
		taskCollection.deleteOne({ _id: objId });

		revalidatePath("/dashboard");
	} catch (error) {
		console.log(error);
	}
}
