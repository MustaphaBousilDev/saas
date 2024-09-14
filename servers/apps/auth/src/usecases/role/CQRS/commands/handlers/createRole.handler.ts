import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from '../implementations';
import { Role, RoleRepositorySQL } from '@app/infra/persistences';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler
  implements ICommandHandler<CreateRoleCommand>
{
  constructor(private readonly roleRepository: RoleRepositorySQL) {}

  async execute(command: CreateRoleCommand): Promise<any> {
    const { role: roleDTO, user } = command;
    console.log('command handler', roleDTO, user);
    const role = new Role({
      ...roleDTO,
      user: user,
    });
    try {
      const newRole = await this.roleRepository.create(role);
      return newRole;
    } catch (error) {
      throw new BadRequestException('Failed to create role');
    }
  }
}
