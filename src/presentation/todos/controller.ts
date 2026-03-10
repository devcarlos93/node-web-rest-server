import type { Request, Response } from "express";
import { prisma } from "../../data/postgres/index.js";
import { CreateTodoSchema } from "../../domain/dtos/create-todo.dto.js";
import { UpdateTodoSchema } from "../../domain/dtos/update-todo.dto.js";

export class TodosController {

    // DI
    constructor() {}

    public async getTodos(req: Request, res: Response) {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public async getTodoById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });
        if (!todo) {
            return res.status(404).json({ message: 'Todo no encontrado' });
        }
        return res.json(todo);
    }

    public async createTodo(req: Request, res: Response) {
        const result = CreateTodoSchema.safeParse(req.body);
        if (!result.success) return res.status(400).json({ error: result.error.format() });

        const todo = await prisma.todo.create({
           data: result.data
        });
        return res.json(todo);
    }

    public async updateTodo(req: Request, res: Response) {
        const id = Number(req.params.id);
        const result = UpdateTodoSchema.safeParse(req.body);
        if (!result.success) return res.status(400).json({ error: result.error.format() });
        const { title, completedAt } = result.data;
        const todo = await prisma.todo.update({
            where: {
                id
            },
            data: {
                title,
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });
        return res.json(todo);
    }

    public async deleteTodo(req: Request, res: Response) {
        const id = Number(req.params.id);
        const todo = await prisma.todo.delete({
            where: {
                id
            }
        });
        return res.json(todo);
    }

    
}