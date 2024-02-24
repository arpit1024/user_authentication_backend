import express, { Request, Response } from "express";
import Container from "typedi";
import { UserService } from "../services/user";
import { userSchemaValidator } from "../validations";
import { AuthService } from "../services/auth";
const app = express();
const userService = Container.get(UserService);
const authService = Container.get(AuthService);

export async function registerUser(req: Request, res: Response) {
  try {
    const { name, email, password, phone } = req.body;
    const validationResponse = userSchemaValidator.validate(req.body);
    if (validationResponse.error) {
      return res.status(400).send(validationResponse.error.message);
    }
    await userService.saveUserCollection(name, email, password, phone);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Email and Password is required");
    const response = await authService.loginUser(email, password);
    if (response instanceof Error) {
      return res.status(422).send(response.message);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
