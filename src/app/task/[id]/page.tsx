import { getTask } from "@src/app/api/utils/getTask";
import { auth } from "@src/auth";
import { CommentForm } from "@src/components/commentForm";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { z } from "zod";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Detalhes da tarefa",
};

export default async function Task({ params }: { params: Params }) {
	const { id: taskId } = await params;
	const task = await getTask(taskId);
	const session = await auth();

	if (!task || !task.isPublic) redirect("/");

	return (
		<div className="w-full max-w-5xl mt-10 mx-auto px-[18px] flex flex-col justify-center items-center">
			<main className="w-full">
				<h1 className="mb-[14px] text-3xl font-bold">Tarefa</h1>
				<article className="border border-gray-400 p-[14px] rounded flex justify-center items-center">
					<p className="whitespace-pre-wrap w-full">{task.task}</p>
				</article>
			</main>
			{session?.user && (
				<section className="my-4 w-full max-w-5xl">
					<h2 className="text-2xl font-bold my-3">
						Deixar seu comentário
					</h2>
					<CommentForm session={session} />
				</section>
			)}
		</div>
	);
}
