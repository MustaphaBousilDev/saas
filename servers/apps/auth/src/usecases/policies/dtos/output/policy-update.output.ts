import { Expose } from 'class-transformer';
import { Policies } from '@app/infra/persistences';

export class PolicyUpdateOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly policyName: string;

  @Expose()
  readonly status: boolean;

  constructor(policy: Policies) {
    this.policyName = policy.policyName;
    this.status = policy.status;
    this.message = 'Success Updating policy.';
  }
}
