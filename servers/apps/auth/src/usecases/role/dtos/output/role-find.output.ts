import { Role } from '@app/infra/persistences';
import { UserGetDTO } from '@app/useCases/user/dtos';
import { Expose } from 'class-transformer';

export class RoleFindOutputDTO {
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

  constructor(role: Role) {
    this.name = role.name;
    this.status = role.status;
    this.createdAt = role.createdAt;
    this.updatedAt = role.updatedAt;
    this.userCreated = role.user ? new UserGetDTO(role.user) : undefined;
  }
}
