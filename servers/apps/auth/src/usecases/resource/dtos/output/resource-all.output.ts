import { Resource } from '@app/infra/persistences';
//import { UserGetDTO } from '@app/useCases/user/dtos';
import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  email: string;
  @Expose()
  username: string;

  constructor(user: any) {
    this.email = user.email;
    this.username = user.username;
  }
}

export class ResourceGetAllOutputDTO {
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

  constructor(resource: Resource) {
    this.name = resource.name;
    this.status = resource.status;
    this.createdAt = resource.createdAt;
    this.updatedAt = resource.updatedAt;
    this.deletedAt = resource.deletedAt;
    this.userCreated = resource.user ? new UserDTO(resource.user) : undefined;
  }

  static fromResource(resources: Resource[]): ResourceGetAllOutputDTO[] {
    return resources.map((resource) => new ResourceGetAllOutputDTO(resource));
  }
}
