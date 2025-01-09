import { z } from "zod";

export const UserInfoSchema = z.object({
	createdAt: z.date(),
	createdBy: z.object({
		name: z.string(),
		email: z.string().email(),
	}),
});
