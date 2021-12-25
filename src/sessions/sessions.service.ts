import { sessionsModel } from './sessions.model';
import { IRefreshTokenDoc } from '../typings';

class SessionsService {
  async create(token: string): Promise<string> {
    const now = Date.now();
    const exp = now + 60 * 60 * 24;
    const newRefreshToken: IRefreshTokenDoc = await new sessionsModel({
      token,
      in_at: now,
      exp_at: exp,
    }).save();

    return newRefreshToken._id;
  }

  async getToken(id: string): Promise<string> {
    const refreshToken: IRefreshTokenDoc = await sessionsModel.findById(id);

    if (!refreshToken) {
      throw 'Invalid token id';
    }

    if (refreshToken.exp_at < Date.now()) {
      throw 'Loin session Expired please login again';
    }

    return refreshToken.token;
  }
}

export const sessionsService = new SessionsService();
