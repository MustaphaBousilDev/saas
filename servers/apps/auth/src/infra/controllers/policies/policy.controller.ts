import { IJwtServicePayload } from '@app/domain';
import { CurrentUser } from '@app/shared';
import {
  PolicyAllUseCases,
  PolicyCreateInputDTO,
  PolicyCreateOutputDTO,
  PolicyCreateUseCases,
  PolicyDeleteOutputDTO,
  PolicyDeleteUseCases,
  PolicyFilterDTO,
  PolicyFindOutputDTO,
  PolicyGetAllOutputDTO,
  PolicyGetUseCases,
  PolicyPatchUseCases,
  PolicyUpdateInputDTO,
  PolicyUpdateOutputDTO,
  PolicyUpdateUseCases,
} from '@app/useCases/policies';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Request,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwtAuth.guard';
@Controller('api/v1/iam/policies')
export class PolicyController {
  constructor(
    private readonly policyAll: PolicyAllUseCases,
    private readonly policyCreate: PolicyCreateUseCases,
    private readonly policyDelete: PolicyDeleteUseCases,
    private readonly policyGet: PolicyGetUseCases,
    private readonly policyUpdate: PolicyUpdateUseCases,
    private readonly policyPatch: PolicyPatchUseCases,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPolicy(
    @Request() request: any,
    @Body() policyDTO: PolicyCreateInputDTO,
    @CurrentUser() user: IJwtServicePayload,
  ): Promise<PolicyCreateOutputDTO> {
    const ip = request.ip;
    await this.policyCreate.rateLimiting(ip);
    await this.policyCreate.checkPolicyByName(policyDTO.policyName);
    const policyResponse = await this.policyCreate.createPolicy(
      policyDTO,
      user.userId,
    );

    return new PolicyCreateOutputDTO(policyResponse);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:policy')
  async getRole(@Param('policy') policy: string, @Request() request: any) {
    try {
      const ip = request.ip;
      await this.policyGet.rateLimiting(ip);
      const policyResponse = await this.policyGet.getPolicy(policy);

      return new PolicyFindOutputDTO(policyResponse);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPolicy(
    @Request() request: any,
    @Query() filterDto: PolicyFilterDTO,
  ) {
    const ip = request.ip;
    await this.policyAll.rateLimiting(ip);
    const policies = await this.policyAll.getAllPolicy(filterDto);

    return PolicyGetAllOutputDTO.fromPolicy(policies);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:policy')
  async updatePolicy(
    @Request() request: any,
    @Body() policyDTO: PolicyCreateInputDTO,
    @CurrentUser() user: any,
    @Param('policy') policy: string,
  ) {
    const ip = request.ip;
    await this.policyUpdate.rateLimiting(ip);
    await this.policyUpdate.checkPolicyByName(policyDTO.policyName);
    await this.policyUpdate.updatePolicy(policy, user.userId, policyDTO);
    const newPolicy = await this.policyUpdate.verifyPolicyByName(
      policyDTO.policyName,
    );
    return new PolicyUpdateOutputDTO(newPolicy);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:policy')
  async updatePartialPolicy(
    @Request() request: any,
    @Body() policyDTO: PolicyUpdateInputDTO,
    @CurrentUser() user: any,
    @Param('policy') policy: string,
  ) {
    console.log(policyDTO);
    const ip = request.ip;
    await this.policyPatch.rateLimiting(ip);
    if (policyDTO.policyName) {
      await this.policyPatch.checkPolicyByName(policyDTO.policyName);
    }
    await this.policyPatch.updatePolicy(policy, user.userId, policyDTO);
    if (policyDTO.policyName) {
      const newPolicy = await this.policyPatch.verifyPolicyByName(
        policyDTO.policyName,
      );
      return new PolicyUpdateOutputDTO(newPolicy);
    }
    return 'Success Update Partial';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:policy')
  async deletePolicy(@Request() request: any, @Param('policy') policy: string) {
    const ip = request.ip;
    await this.policyDelete.rateLimiting(ip);
    const policyInfo = await this.policyDelete.checkPolicy(policy);
    await this.policyDelete.deletePolicies(policy);
    return new PolicyDeleteOutputDTO(policyInfo);
  }
}
