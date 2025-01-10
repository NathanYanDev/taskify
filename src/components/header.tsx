import Link from "next/link";
import { auth } from "@src/auth";
import SignOutBtn from "./signOutBtn";
import SignInBtn from "./signInBtn";

import Image from "next/image";
import Logo from "@public/assets/logo.svg";

export async function Header() {
	const session = await auth();

	return (
		<header className="w-full h-[76px] bg-background flex items-center justify-center">
			<section className="px-[18px] w-full max-w-5xl flex items-center justify-between">
				<nav className="flex items-center gap-3">
					<Link href="/">
						<Image src={Logo} alt="Logo" width={76} height={76} />
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
