import { getTask } from "@src/app/api/utils/getTask";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Detalhes da tarefa",
};

export default async function Task({ params }: { params: Params }) {
	const { id: taskId } = await params;
	const task = await getTask(taskId);

	if (!task || !task.isPublic) redirect("/");

	return (
		<div>
			<h1>Task Page</h1>
			<p>{taskId}</p>
		</div>
	);
}
