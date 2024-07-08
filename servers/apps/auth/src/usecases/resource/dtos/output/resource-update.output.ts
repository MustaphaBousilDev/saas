import { Expose } from 'class-transformer';
import { Resource } from '@app/infra/persistences';

export class ResourceUpdateOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly url: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly status: boolean;

  constructor(resource: Resource) {
    this.url = resource.url;
    this.name = resource.name;
    this.status = resource.status;
    this.message = 'Success Updating Resource.';
  }
}
