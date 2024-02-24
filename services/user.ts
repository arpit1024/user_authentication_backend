import { Service } from "typedi";
import { UserCollection } from "../databases/user";
import bcrypt from "bcrypt";
import { User } from "../models/mongoModels";
interface IUserService {
    findUserByEmail(email: string): Promise<User | null>;
    saveUserCollection(name: string, email: string, password: string, phone: string): void;
}
@Service()
export class UserService implements IUserService {
    constructor(private readonly userCollection: UserCollection) {}

    async findUserByEmail(email: string) {
        return this.userCollection.findUserByEmail(email);
    }

    async saveUserCollection(name: string, email: string, password: string, phone: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userCollection.saveCollection(name, email, hashedPassword, phone);
    }
}
