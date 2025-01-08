import { signOut } from "@src/auth";
import type { Session } from "next-auth";

type SignOutProps = {
	session: Session;
};

export default function SignOutBtn({ session }: SignOutProps) {
	return (
		<form
			action={async () => {
				"use server";
				await signOut();
			}}
		>
			<button
				type="submit"
				className="py-2 px-8 rounded-3xl text-white border border-white hover:bg-white hover:text-background hover:border-background"
			>
				Olá {session.user?.name}
			</button>
		</form>
	);
}
