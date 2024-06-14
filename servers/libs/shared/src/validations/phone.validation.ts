import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsPhoneNumber implements ValidatorConstraintInterface {
  validate(phone: string) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  }

  defaultMessage() {
    return 'Invalid phone number format';
  }
}
