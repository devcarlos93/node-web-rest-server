import type { Request, Response } from "express";

export class TodosController {
    private todos = [
        {
        id: '1',
        title: 'Todo 1',
        done: false,
        createdAt: new Date()
        },
        {
        id: '2',
        title: 'Todo 2',
        done: true,
        createdAt: new Date()
        },
        {
        id: '3',
        title: 'Todo 3',
        done: false,
        createdAt: new Date()
        }
    ];


    // DI
    constructor() {}

    public getTodos(req: Request, res: Response) {
        return res.json(this.todos);
    }

    public getTodoById(req: Request, res: Response) {
        const id = req.params.id;
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo no encontrado' });
        }
        return res.json(todo);
    }

    public createTodo(req: Request, res: Response) {
        console.log(req.body);
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title es requerido' });
        }
        const todo = {
            id: (this.todos.length + 1).toString(),
            title,
            done: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return res.json(todo);
    }

    public updateTodo(req: Request, res: Response) {
        const id = req.params.id;
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo no encontrado' });
        }
        const { title, done } = req.body;
        if (title) {
            todo.title = title;
        }
        if (done !== undefined) {
            todo.done = done;
        }
        return res.json(todo);
    }

    public deleteTodo(req: Request, res: Response) {
        const id = req.params.id;
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo no encontrado' });
        }
        this.todos = this.todos.filter(todo => todo.id !== id);
        return res.json(todo);
    }

    
}