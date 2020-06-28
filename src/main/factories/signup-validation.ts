import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { ValidationCompose } from '../../presentation/helpers/validators/validation-compose'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldValidation } from '../../presentation/helpers/validators/compare-field-validation'
import { EmailValidaton } from '../../presentation/helpers/validators/email-validation'

export const makeSignUpValidation = (): ValidationCompose => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidaton('email', new EmailValidatorAdapter()))
  return new ValidationCompose(validations)
}
