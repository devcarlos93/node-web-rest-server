import { z } from "zod";

export const CreateTodoSchema = z.object({
    title: z.string().min(4, "Title es requerido"),
});

export type CreateTodoDto = z.infer<typeof CreateTodoSchema>;
