import express, { Request, Response, NextFunction } from "express";

import { json } from "body-parser";

import todoRoutes from "./routes/todos";

const app = express();
const port = 3000;

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Endpoint doesn't exist" });
  });

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
