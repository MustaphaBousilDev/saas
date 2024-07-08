import { Role } from '@app/infra/persistences';
import { Expose } from 'class-transformer';

class UserDTO {
  @Expose()
  email: string;
  @Expose()
  username: string;

  constructor(user: any) {
    this.email = user.email;
    this.username = user.username;
  }
}

export class ResourceFindOutputDTO {
  @Expose()
  readonly name: string;

  @Expose()
  readonly status: boolean;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;

  @Expose()
  readonly deletedAt?: Date;

  @Expose()
  readonly userCreated?: UserDTO;

  constructor(role: Role) {
    this.name = role.name;
    this.status = role.status;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.userCreated = role.user ? new UserDTO(role.user) : undefined;
  }
}
