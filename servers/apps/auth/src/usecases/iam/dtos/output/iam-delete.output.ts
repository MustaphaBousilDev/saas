import { Expose } from 'class-transformer';
import { UserAuth } from '@app/infra/persistences';

export class IAMDeleteOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  constructor(user: UserAuth) {
    this.name = user.username;
    this.email = user.email;
    this.message = `Success Deleting IAM For User: ${this.name}`;
  }
}
