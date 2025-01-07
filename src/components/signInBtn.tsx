import { signIn } from "@/auth";

export default function SignInBtn() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google", { redirectTo: "/dashboard" });
			}}
		>
			<button
				type="submit"
				className="py-2 px-8 rounded-3xl text-white border border-white hover:bg-white hover:text-background hover:border-background"
			>
				Acessar
			</button>
		</form>
	);
}
