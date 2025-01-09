"use client";

import { Textarea } from "@src/components/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormSchema } from "@src/schemas/taskSchema";
import { UserInfoSchema } from "@src/schemas/userInfoSchema";
import type { z } from "zod";
import type { Session } from "next-auth";
import { setTask } from "@src/app/api/utils/setTask";

type FormProps = {
	session: Session;
};

const TaskSchema = TaskFormSchema.merge(UserInfoSchema);

export const TaskForm = ({ session }: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<z.infer<typeof TaskFormSchema>>({
		resolver: zodResolver(TaskFormSchema),
		defaultValues: { task: "", isPublic: false },
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

		reset({ task: "", isPublic: false });

		setTask(task);
	};

	return (
		<form onSubmit={handleSubmit(handleTaskSubmit)}>
			<Textarea
				placeholder="Digite qual sua tarefa..."
				{...register("task")}
			/>
			{errors.task && (
				<span className="text-red-600 font-bold">
					{errors.task?.message}
				</span>
			)}
			<div className="flex items-center my-3">
				<input
					type="checkbox"
					id="public-task"
					className="w-[18px] h-[18px]"
					{...register("isPublic")}
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
