import { IsNotEmpty, IsString } from 'class-validator';

export class PolicyFindInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
