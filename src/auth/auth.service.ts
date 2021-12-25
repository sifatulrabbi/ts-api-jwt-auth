import * as jwt from 'jsonwebtoken';
import { configs } from '../configs';
import { usersService } from '../users';
import { IUser } from '../typings';

export class Service {
  async login(username: string, password: string): Promise<string> {
    const user = await usersService.getOneUser({ username });

    if (!user) {
      throw 'User not found';
    }

    if (user.password !== password) {
      throw 'Incorrect password';
    }

    const payload: IUser = {
      _id: user._id,
      username: user.username,
      password: user.password,
    };
    const token: string = jwt.sign(payload, configs.JWT_SECRET, {
      algorithm: 'HS512',
      expiresIn: 300,
    });

    return token;
  }

  logout(): void {}
}

export const authService = new Service();
