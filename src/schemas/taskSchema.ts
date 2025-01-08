import { z } from "zod";

export const TaskFormSchema = z.object({
	task: z.string().min(1, "O campo não pode estar vazio"),
	isPublic: z.boolean(),
});

export const TaskSchema = z.object({
	task: z.string().min(1, "O campo não pode estar vazio"),
	createdAt: z.date(),
	createdBy: z.object({
		name: z.string(),
		email: z.string().email(),
	}),
	isPublic: z.boolean(),
});
