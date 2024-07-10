import { Policies, PolicyCategory } from '@app/infra/persistences';
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

export class PolicyGetAllOutputDTO {
  @Expose()
  readonly policyName: string;

  @Expose()
  readonly status: boolean;

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
    this.status = policy.status;
    this.createdAt = policy.createdAt;
    this.category = policy.category;
    this.policyDocument = policy.policyDocument;
    this.userCreated = policy.user ? new UserDTO(policy.user) : undefined;
  }

  static fromPolicy(policies: Policies[]): PolicyGetAllOutputDTO[] {
    return policies.map((policy) => new PolicyGetAllOutputDTO(policy));
  }
}
