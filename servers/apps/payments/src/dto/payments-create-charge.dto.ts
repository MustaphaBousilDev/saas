import { CreateChargeDto } from '@app/shared';
import { IsEmail } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
