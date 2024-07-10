import { Expose } from 'class-transformer';
import { Permission } from '@app/infra/persistences';

export class IAMUpdateOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly _id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly status: boolean;

  constructor(permission: Permission) {
    this._id = permission._id;
    this.name = permission.name;
    this.status = permission.status;
    this.message = 'Success Updating Permission.';
  }
}
