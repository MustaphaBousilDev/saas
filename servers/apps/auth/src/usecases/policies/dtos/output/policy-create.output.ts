import { Expose } from 'class-transformer';
import { Policies } from '@app/infra/persistences';

export class PolicyCreateOutputDTO {
  @Expose()
  readonly _id: number;

  @Expose()
  readonly policyName: string;

  @Expose()
  readonly status: boolean;

  constructor(policy: Policies) {
    this._id = policy._id;
    this.policyName = policy.policyName;
    this.status = policy.status;
  }
}
