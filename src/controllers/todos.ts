import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  console.log(req.body);

  TODOS.push(newTodo);
  res.status(201).json({ message: "Created Todo!", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const totoId = req.params.id;

  if (totoId) {
    const pos = TODOS.findIndex((todo) => todo.id === req.params.id);
    if (pos < 0)
      return res.status(401).json({ message: "Please input a valid id" });

    const removed = TODOS.splice(pos, 1);
    return res.status(200).json({
      message: "Deleted successfully!",
      deletedTodo: removed[0],
      todos: TODOS,
    });
  }
  return res.status(401).json({ message: "Please input an id" });
};

export const patchTodo: RequestHandler = (req, res, next) => {
  const totoId = req.params.id;
  if (totoId && req.body.text) {
    const pos = TODOS.findIndex((todo) => todo.id === req.params.id);
    if (pos < 0)
      return res.status(401).json({ message: "Please input a valid id" });

    const old = TODOS[pos];
    const edited = { ...old, text: req.body.text };
    TODOS.splice(pos, 0, edited);

    return res.status(200).json({
      message: "Edited!",
      oldValue: old,
      newValue: edited,
      todos: TODOS,
    });
  } else {
    return res.status(401).json({ message: "Please input an id/text" });
  }
};
