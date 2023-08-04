import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { IsChileanRUNConstraint } from '../is-chilean-run';
import * as RUN from '../../../../application/common/helpers/run';

jest.mock('../../../../application/common/helpers/run');

describe('IsChileanRUNValidator', () => {
  let validator: ValidatorConstraintInterface;

  beforeEach(() => {
    validator = new IsChileanRUNConstraint();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(validator).toBeDefined();
  });

  it('should validate', () => {
    const param = 'data';

    const validateRUNSpyOn = jest
      .spyOn(RUN, 'validateRUN')
      .mockReturnValue(true);

    const result = validator.validate(param);

    expect(result).toBeDefined();
    expect(result).toBe(true);
    expect(validateRUNSpyOn).toBeCalledWith(param);
  });

  it('should return a message', () => {
    const param = 'asd';

    const result = validator.defaultMessage({
      property: param,
    } as ValidationArguments);

    expect(result).toContain(`property ${param} should be a valid RUN`);
  });
});
