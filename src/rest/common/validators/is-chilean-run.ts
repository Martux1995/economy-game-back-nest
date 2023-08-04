import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { validateRUN } from '../../../application/common/helpers/run';

@ValidatorConstraint({ name: 'isChileanRUN', async: false })
export class IsChileanRUNConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return typeof value === 'string' && validateRUN(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `property ${args.property} should be a valid RUN`;
  }
}

export function IsChileanRUN() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: IsChileanRUNConstraint,
    });
  };
}
