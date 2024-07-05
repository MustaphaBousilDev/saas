import { Permission } from '@app/infra/persistences';
import { UserGetDTO } from '@app/useCases/user/dtos';
import { Expose } from 'class-transformer';

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
  readonly userCreated?: UserGetDTO;

  constructor(permission: Permission) {
    this.name = permission.name;
    this.status = permission.status;
    this.createdAt = permission.createdAt;
    this.updatedAt = permission.updatedAt;
    this.userCreated = permission.user
      ? new UserGetDTO(permission.user)
      : undefined;
  }
}
