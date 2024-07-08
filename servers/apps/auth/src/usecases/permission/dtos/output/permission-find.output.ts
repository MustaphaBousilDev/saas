import { Permission } from '@app/infra/persistences';
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

export class PermissionFindOutputDTO {
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

  constructor(permission: Permission) {
    this.name = permission.name;
    this.status = permission.status;
    this.createdAt = permission.createdAt;
    this.updatedAt = permission.updatedAt;
    this.userCreated = permission.user
      ? new UserDTO(permission.user)
      : undefined;
  }
}
