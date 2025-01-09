"use client";

import { Textarea } from "@src/components/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CommentFormSchema,
	type CommentInfo,
} from "@src/schemas/commentSchema";
import type { Session } from "next-auth";
import { setComment } from "@src/app/api/utils/setComment";
import type { z } from "zod";

type Comment = z.infer<typeof CommentFormSchema>;

type FormProps = {
	session: Session | null;
	taskId: string;
};

export const CommentForm = ({ session, taskId }: FormProps) => {
	const {
		handleSubmit,
		register,
		resetField,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(CommentFormSchema),
		defaultValues: { comment: "" },
	});

	const handleCommentSubmit = (data: Comment) => {
		if (session?.user) {
			const newComment: z.infer<typeof CommentInfo> = {
				taskID: taskId,
				comment: data.comment,
				createdAt: new Date(),
				createdBy: {
					name: session.user.name as string,
					email: session.user.email as string,
				},
			};

			setComment(newComment, taskId);
			resetField("comment");
		}
	};

	return (
		<form onSubmit={handleSubmit(handleCommentSubmit)}>
			<Textarea
				placeholder="Digite seu comentário..."
				{...register("comment")}
			/>
			{errors && <span>{errors.comment?.message}</span>}
			<button
				type="submit"
				className="w-full py-3 rounded text-white bg-secondary text-lg disabled:cursor-not-allowed disabled:opacity-25"
				disabled={!session}
			>
				{!session ? "Faça o login para comentar!" : "Comentar"}
			</button>
		</form>
	);
};
