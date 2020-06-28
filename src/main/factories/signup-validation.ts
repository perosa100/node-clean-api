import { ValidationCompose } from '../../presentation/helpers/validators/validation-compose'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'

export const makeSignUpValidation = (): ValidationCompose => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationCompose(validations)
}
