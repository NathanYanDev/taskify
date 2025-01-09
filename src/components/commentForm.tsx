"use client";

import { Textarea } from "./textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentFormSchema } from "@src/schemas/commentSchema";
import { UserInfoSchema } from "@src/schemas/userInfoSchema";
import type { z } from "zod";
import type { Session } from "next-auth";

type Comment = z.infer<typeof CommentFormSchema>;

const CommentInfo = CommentFormSchema.merge(UserInfoSchema);

type FormProps = {
	session: Session;
};

export const CommentForm = ({ session }: FormProps) => {
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
				comment: data.comment,
				createdAt: new Date(),
				createdBy: {
					name: session.user.name as string,
					email: session.user.email as string,
				},
			};

			console.log(newComment);
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
				className="w-full py-3 rounded text-white bg-secondary text-lg"
			>
				Comentar
			</button>
		</form>
	);
};
