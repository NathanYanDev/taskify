"use client";

import { useState } from "react";
import { Textarea } from "./textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema } from "@src/schemas/taskSchema";
import type { TaskSchema } from "@src/schemas/taskSchema";
import type { z } from "zod";
import type { Session } from "next-auth";
import { setTask } from "@src/app/api/utils/setTask";

type FormProps = {
	session: Session;
};

export const Form = ({ session }: FormProps) => {
	const [input, setInput] = useState("");
	const [publicTask, setPublicTask] = useState(false);

	const { register, handleSubmit } = useForm<z.infer<typeof TaskFormSchema>>({
		resolver: zodResolver(TaskFormSchema),
	});

	const handleTaskSubmit = (data: z.infer<typeof TaskFormSchema>) => {
		const task: z.infer<typeof TaskSchema> = {
			task: data.task,
			isPublic: data.isPublic,
			createdAt: new Date(),
			createdBy: {
				name: session.user?.name as string,
				email: session.user?.email as string,
			},
		};

		setTask(task);
		setInput("");
		setPublicTask(false);
	};

	return (
		<form onSubmit={handleSubmit(handleTaskSubmit)}>
			<Textarea
				placeholder="Digite qual sua tarefa..."
				value={input}
				{...register("task", {
					onChange(event) {
						setInput(event.target.value);
					},
				})}
			/>
			<div className="flex items-center my-3">
				<input
					type="checkbox"
					id="public-task"
					className="w-[18px] h-[18px]"
					checked={publicTask}
					{...register("isPublic", {
						onChange: () => setPublicTask(!publicTask),
					})}
				/>
				<label htmlFor="public-task" className="text-white ml-2">
					Deixar sua tarefa pública?
				</label>
			</div>

			<button
				type="submit"
				className="w-full rounded text-white bg-secondary py-3 text-lg hover:text-secondary hover:bg-white checked:bg-white"
			>
				Registrar
			</button>
		</form>
	);
};
