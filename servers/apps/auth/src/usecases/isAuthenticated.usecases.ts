import { UserM, UserWithoutPassword } from '../domain/model/user';
import { UserRepository } from '../domain/repositories/userRepository.interface';

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepository) {}
  async execute(userId: number): Promise<UserWithoutPassword> {
    const user: UserM = await this.adminUserRepo.getUserByUsername(userId);
    const { password, ...info } = user;
    console.log(password);
    return info;
  }
}
