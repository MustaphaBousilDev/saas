import { Expose } from 'class-transformer';
import { Policies } from '@app/infra/persistences';

export class PolicyDeleteOutputDTO {
  @Expose()
  readonly message: string;

  @Expose()
  readonly policyName: string;

  constructor(policy: Policies) {
    this.policyName = policy.policyName;
    this.message = 'Success Deleting policy';
  }
}
