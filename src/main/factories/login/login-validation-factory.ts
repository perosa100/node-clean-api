import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { ValidationCompose, RequiredFieldValidation } from '../../../presentation/helpers/validators'
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
