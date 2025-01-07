import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Share2Icon, TrashIcon } from "lucide-react";
import { Form } from "@/components/form";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Dashboard() {
	const session = await auth();

	if (!session?.user) {
		redirect("/");
	}

	return (
		<main className="w-full">
			<section className="bg-background w-full flex items-center justify-center">
				<div className="max-w-5xl w-full px-[18px] pb-7 mt-14">
					<h1 className="text-3xl text-white font-bold mb-2">
						Qual sua tarefa?
					</h1>
					<Form />
				</div>
			</section>
			<section className="mt-8 mx-auto px-[18px] w-full max-w-5xl flex flex-col">
				<h1 className="text-center text-3xl font-bold mb-[14px]">
					Minhas tarefas
				</h1>
				<article className="mb-[14px] flex flex-col items-start border border-gray-400 rounded p-[14px]">
					<div className="flex items-center justify-center gap-3 mb-2">
						<span className="bg-secondary text-primary py-[2px] px-[6px] rounded text-xs">
							PUBLICO
						</span>
						<button type="button">
							<Share2Icon size={20} color="#3183ff" />
						</button>
					</div>

					<div className="flex items-center justify-between w-full">
						<p className="whitespace-pre-wrap">
							Minha primeira tarefa
						</p>
						<button type="button" className="mx-2">
							<TrashIcon size={24} color="#ff0000" />
						</button>
					</div>
				</article>
			</section>
		</main>
	);
}
