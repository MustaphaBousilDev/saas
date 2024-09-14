import { UserAuth } from '@app/infra/persistences';
import { RoleCreateInputDTO } from '@app/useCases/role/dtos';

export class CreateRoleCommand {
  constructor(
    public role: RoleCreateInputDTO,
    public user: UserAuth,
  ) {}
}
