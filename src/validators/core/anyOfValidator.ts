import { IValidator, IValidationError } from './validator';

export class AnyOfValidator implements IValidator {
  public constructor(private validators: IValidator[]) {}

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined || input === null) {
      return null;
    }
    let valid: boolean = false;
    for (let validator of this.validators) {
      const errors = validator.validate(input, path, field);
      if (!errors) {
        valid = true;
        break;
      }
    }

    if (!valid) {
      return [{
        message: field + " property is invalid",
        path: (path ? path + "." : "") + field,
        keyword: "invalid"
      }];
    }

    return null;
  }
}
