import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { ValidationCompose } from '../../../presentation/helpers/validators/validation-compose'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidaton } from '../../../presentation/helpers/validators/email-validation'

export const makeLoginValidation = (): ValidationCompose => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidaton('email', new EmailValidatorAdapter()))
  return new ValidationCompose(validations)
}
