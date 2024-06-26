import { IsNotEmpty, IsString } from 'class-validator';

export class RoleFindInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
