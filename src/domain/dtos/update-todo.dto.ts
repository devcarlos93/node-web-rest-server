import { z } from "zod";

export const UpdateTodoSchema = z.object({
    title: z.string().min(4, "Title es requerido"),
    completedAt: z.date().optional(),
});

export type UpdateTodoDto = z.infer<typeof UpdateTodoSchema>;
