import { Expose } from 'class-transformer';
import { Role } from '@app/infra/persistences';

export class RoleUpdateOutputDTO {
  @Expose()
  readonly _id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly status: boolean;

  constructor(role: Role) {
    this._id = role._id;
    this.name = role.name;
    this.status = role.status;
  }
}
