import { Expose } from 'class-transformer';
import { Role } from '@app/infra/persistences';

export class RoleDeleteOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly name: string;

  constructor(role: Role) {
    this.name = role.name;
    this.message = 'Success Deleting role';
  }
}
