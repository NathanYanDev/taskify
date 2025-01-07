import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Taskify",
	description: "Organize suas tarefas, aumente sua produtividade.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>{children}</body>
		</html>
	);
}
