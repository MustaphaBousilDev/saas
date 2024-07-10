import { Policies, PolicyCategory } from '@app/infra/persistences';
import { Expose } from 'class-transformer';

class UserDTO {
  @Expose()
  email: string;
  @Expose()
  username: string;

  constructor(user: any) {
    this.email = user.email;
    this.username = user.username;
  }
}

export class PolicyFindOutputDTO {
  @Expose()
  readonly policyName: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly category: PolicyCategory;

  @Expose()
  readonly policyDocument: JSON;

  @Expose()
  readonly userCreated?: UserDTO;

  constructor(policy: Policies) {
    this.policyName = policy.policyName;
    this.createdAt = policy.createdAt;
    this.category = policy.category;
    this.userCreated = policy.user ? new UserDTO(policy.user) : undefined;
  }
}
