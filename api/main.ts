import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { UserModel, User } from "./model";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: " Example 🤟" });
});


app.get("/users", async (req: Request, res: Response): Promise<Response> => {
    const allDogs: User[] = await UserModel.find();
    return res.status(200).json(allDogs);
  });
  
  app.get("/users/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user: User | null = await UserModel.findById(id);
    return res.status(200).json(user);
  });
  
  app.post("/users", async (req: Request, res: Response): Promise<Response> => {
    const user: User = await UserModel.create({ ...req.body });
    return res.status(201).json(user);
  });
  
  app.put("/users/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await UserModel.updateOne({ id }, req.body);
    const updatedDog: User | null = await UserModel.findById(id);
    return res.status(200).json(updatedDog);
  });
  
  app.delete("/users/:id", async (req: Request, res: Response): Promise<Response> => {
      const { id } = req.params;
      const deletedDog: User | null = await UserModel.findOneAndDelete({ id });
      return res.status(200).json(deletedDog);
    }
  );

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(
        "mongodb://localhost:27017/typegoose"
      );
    app.listen(9200, () => {
      console.log("Server started on port http://localhost:9200/");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();