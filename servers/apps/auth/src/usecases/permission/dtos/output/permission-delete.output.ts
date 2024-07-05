import { Expose } from 'class-transformer';
import { Permission } from '@app/infra/persistences';

export class PermissionDeleteOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly name: string;

  constructor(permission: Permission) {
    this.name = permission.name;
    this.message = 'Success Deleting permission';
  }
}
