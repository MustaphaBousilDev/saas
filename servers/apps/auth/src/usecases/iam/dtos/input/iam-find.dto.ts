import { IsNotEmpty, IsString } from 'class-validator';

export class IAMFindInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
