import { z } from "zod";
import { UserInfoSchema } from "./userInfoSchema";

export const CommentFormSchema = z.object({
	comment: z.string().min(1, "O campo não pode estar vazio"),
});

export const CommentInfo = CommentFormSchema.merge(UserInfoSchema).merge(
	z.object({ taskID: z.string() }),
);
