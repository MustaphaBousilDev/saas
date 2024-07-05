import { IsNotEmpty, IsString } from 'class-validator';

export class PermissionFindInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
