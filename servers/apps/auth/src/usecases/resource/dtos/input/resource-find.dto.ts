import { IsNotEmpty, IsString } from 'class-validator';

export class ResourceFindInputDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
