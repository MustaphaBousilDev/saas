import { UserAuth } from '@app/infra/persistences';
import { Expose } from 'class-transformer';

export class UserGetDTO {
  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;

  constructor(user: UserAuth) {
    this.username = user.username;
    this.email = user.email;
  }
}
