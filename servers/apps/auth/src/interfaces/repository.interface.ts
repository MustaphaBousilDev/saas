import { UserM } from '../users/models/user.class';
// import { UserWithoutPassword } from '../model/user';
export interface UserRepository {
  getUserByEmail(email: string): Promise<UserM>;
  updateLastLogin(username: string): Promise<void>;
  updateRefreshToken(username: string, refreshToken: string): Promise<void>;
  // getAllUsers(): Promise<UserWithoutPassword[]>;
}
