import { z } from "zod";

export const CommentFormSchema = z.object({
	comment: z.string().min(1, "O campo não pode estar vazio"),
});
