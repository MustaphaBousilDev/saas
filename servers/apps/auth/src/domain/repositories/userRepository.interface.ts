import { UserM } from '../model/user';

export interface UserRepository {
  getUserByUsername(userId: number): Promise<UserM>;
  updateLastLogin(userId: number): Promise<void>;
  updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
