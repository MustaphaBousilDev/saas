import { Expose } from 'class-transformer';
import { Role_Has_Resource_Permission } from '@app/infra/persistences';

export class IAMCreateOutputDTO {
  @Expose()
  readonly _id: number;

  @Expose()
  message: string;

  constructor(resourceIAM: Role_Has_Resource_Permission) {
    this._id = resourceIAM._id;
    this.message = 'Success Creating this IAM ';
  }

  static fromIAM(iam: Role_Has_Resource_Permission[]): IAMCreateOutputDTO[] {
    return iam.map((im) => new IAMCreateOutputDTO(im));
  }
}
