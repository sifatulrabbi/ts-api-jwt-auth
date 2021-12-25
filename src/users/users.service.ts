import { IUser, IUserDocument } from "../typings";
import { usersModel } from "./users.models";

class UsersService {
  async getAllUser(): Promise<IUserDocument[]> {
    const users = await usersModel.find({});
    return users;
  }

  async getOneUser({
    id,
    username,
  }: {
    id?: string;
    username?: string;
  }): Promise<IUserDocument | null> {
    const user = id
      ? await usersModel.findById(id)
      : username
      ? await usersModel.findOne({ username })
      : null;

    return user;
  }

  async create({
    username,
    password,
  }: Omit<IUser, "_id">): Promise<IUserDocument> {
    const newUser = await new usersModel({ username, password }).save();
    return newUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.getOneUser({ id });

    if (!user) {
      throw "User not found";
    }

    user.remove();
  }
}

export const usersService = new UsersService();
