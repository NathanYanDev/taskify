import Link from "next/link";
import { auth } from "@/auth";
import SignOutBtn from "./signOutBtn";
import SignInBtn from "./signInBtn";

export async function Header() {
	const session = await auth();

	return (
		<header className="w-full h-[76px] bg-background flex items-center justify-center">
			<section className="px-[18px] w-full max-w-5xl flex items-center justify-between">
				<nav className="flex items-center gap-3">
					<Link href="/">
						<h1 className="sm:text-4xl text-3xl text-white">
							Task<span className="text-red-600">ify</span>
						</h1>
					</Link>
					{session && (
						<Link
							href="/dashboard"
							className="bg-primary text-background py-1 px-[14px] rounded mx-[14px] hover:scale-110"
						>
							Meu Painel
						</Link>
					)}
				</nav>
				{session ? <SignOutBtn session={session} /> : <SignInBtn />}
			</section>
		</header>
	);
}
