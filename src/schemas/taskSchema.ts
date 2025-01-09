import { z } from "zod";

export const TaskFormSchema = z.object({
	task: z.string().min(1, "O campo não pode estar vazio"),
	isPublic: z.boolean(),
});
