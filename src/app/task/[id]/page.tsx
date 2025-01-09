import { getComments } from "@src/app/api/utils/getComments";
import { getTask } from "@src/app/api/utils/getTask";
import { auth } from "@src/auth";
import { CommentForm } from "@src/components/comments/commentForm";
import { CommentList } from "@src/components/comments/commentList";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Detalhes da tarefa",
};

export default async function Task({ params }: { params: Params }) {
	const { id: taskId } = await params;
	const task = await getTask(taskId);
	const session = await auth();
	const comments = await getComments(taskId);

	if (!task || !task.isPublic) redirect("/");

	return (
		<div className="w-full max-w-5xl mt-10 mx-auto px-[18px] flex flex-col justify-center items-center">
			<main className="w-full">
				<h1 className="mb-[14px] text-3xl font-bold">Tarefa</h1>
				<article className="border border-gray-400 p-[14px] rounded flex justify-center items-center">
					<p className="whitespace-pre-wrap w-full">{task.task}</p>
				</article>
			</main>

			<section className="my-4 w-full max-w-5xl">
				<h1 className="text-3xl font-bold my-3">
					Deixar seu comentário
				</h1>
				<CommentForm session={session} taskId={taskId} />
			</section>
			<section className="my-4 w-full max-w-5xl">
				<h1 className="text-3xl font-bold mb-3">Comentários</h1>
				{comments ? (
					<CommentList session={session} comments={comments} />
				) : (
					<span>Nenhum comentário feito ainda...</span>
				)}
			</section>
		</div>
	);
}
