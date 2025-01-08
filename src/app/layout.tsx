import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./globals.css";
import { Header } from "@src/components/header";

export const metadata: Metadata = {
	title: {
		template: "%s | Taskify",
		default: "Taskify | Organize suas tarefas, aumente sua produtividade",
	},
	description:
		"O melhor organizador de tarefas para realizar seus objetivos.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${inter.className} antialiased`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
