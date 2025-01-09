import Image from "next/image";
import { rubik } from "./ui/fonts";
import heroImage from "@public/assets/hero.png";
import getPostAndCommentQty from "./api/utils/getPostAndCommentQty";

export default async function Home() {
	const { taskQty, commentQty } = await getPostAndCommentQty();
	return (
		<main className="screen-height w-screen flex flex-col justify-center items-center bg-background">
			<div className="flex flex-col items-center justify-center">
				<Image
					src={heroImage}
					alt="Logo Taskify"
					priority
					className="sm:w-[480px] object-contain h-auto max-w-4/5"
				/>
			</div>
			<h1
				className={`sm:text-3xl text-white text-center m-7 max-w-[480px] ${rubik.className} text-2xl`}
			>
				Sistema feito para você organizar seus estudos e tarefas
			</h1>

			<div className="flex justify-center items-center w-full sm:gap-5 flex-col sm:flex-row">
				<section className="px-11 py-3 rounded-md bg-primary hover:scale-110 sm:w-auto w-4/5 sm:mb-0 mb-3 sm:text-left text-center">
					<span className="font-bold">+{taskQty} posts</span>
				</section>
				<section className="px-11 py-3 rounded-md bg-primary hover:scale-110 sm:w-auto w-4/5 sm:mb-0 mb-3 sm:text-left text-center">
					<span className="font-bold">+{commentQty} comentários</span>
				</section>
			</div>
		</main>
	);
}
