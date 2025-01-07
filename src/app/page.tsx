import Image from "next/image";

import heroImage from "../../public/assets/hero.png";

export default function Home() {
	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center bg-[#0F0F0F]">
			<div className="flex flex-col items-center justify-center">
				<Image
					src={heroImage}
					alt="Logo Taskify"
					priority
					className="sm:max-w-[480px] object-contain w-auto h-auto max-w-4/5"
				/>
			</div>
			<h1 className="sm:text-3xl text-white text-center m-7 max-w-[480px] font-[Rubik] text-2xl">
				Sistema feito para você organizar seus estudos e tarefas
			</h1>

			<div className="flex justify-center items-center w-full sm:gap-5 flex-col sm:flex-row">
				<section className="px-11 py-3 rounded-md bg-gray-50 hover:scale-110 sm:w-auto w-4/5 sm:mb-0 mb-3 sm:text-left text-center">
					<span>+12 posts</span>
				</section>
				<section className="px-11 py-3 rounded-md bg-gray-50 hover:scale-110 sm:w-auto w-4/5 sm:mb-0 mb-3 sm:text-left text-center">
					<span>+90 comentários</span>
				</section>
			</div>
		</main>
	);
}
