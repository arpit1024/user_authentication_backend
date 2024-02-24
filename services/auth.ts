import { Service } from "typedi";
import { UserCollection } from "../databases/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/mongoModels";
import { EnvironmentVariables } from "../config/envVariable";
interface IAuthService {
  loginUser(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string } | Error>;
}
@Service()
export class AuthService implements IAuthService {
  constructor(
    private readonly userCollection: UserCollection,
    private readonly envVariables: EnvironmentVariables,
  ) {}

  async loginUser(email: string, password: string) {
    const user: User | null = await this.userCollection.findUserByEmail(email);
    if (!user) {
      return new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Error("Invalid password");
    }
    const token = jwt.sign(
      { userId: user._id },
      this.envVariables.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    return { user: user, token };
  }
}
