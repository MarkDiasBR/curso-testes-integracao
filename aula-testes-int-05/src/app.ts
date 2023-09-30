import express, { Request, Response } from "express";
import fibonacciSequence from "./utils/fibonacciSequence";

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK!");
});

app.get("/fibonacci", (req: Request, res: Response) => {
  const elements = Number(req.query.elements);
  if (isNaN(elements) || (elements < 1 || elements > Number.MAX_VALUE)) {
    return res.sendStatus(400);
  }

  const sequence = fibonacciSequence(elements);
  res.send(sequence);
});

export default app;