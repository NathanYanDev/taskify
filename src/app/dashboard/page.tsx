import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TaskForm } from "@src/components/taskForm";
import { getTasks } from "@src/app/api/utils/getTasks";
import { TaskList } from "@src/components/taskList";
import { auth } from "@src/auth";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	const session = await auth();

	if (!session?.user) redirect("/");

	const tasks = await getTasks(session?.user?.email as string);

	return (
		<main className="w-full">
			<section className="bg-background w-full flex items-center justify-center">
				<div className="max-w-5xl w-full px-[18px] pb-7 mt-14">
					<h1 className="text-3xl text-white font-bold mb-2">
						Qual sua tarefa?
					</h1>
					<TaskForm session={session} />
				</div>
			</section>
			<section className="mt-8 mx-auto px-[18px] w-full max-w-5xl flex flex-col">
				<h1 className="text-center text-3xl font-bold mb-[14px]">
					Minhas tarefas
				</h1>
				{tasks ? (
					<TaskList tasks={tasks} />
				) : (
					<p className="text-lg font-bold">
						Sem tarefas criadas até o momento...
					</p>
				)}
			</section>
		</main>
	);
}
