import { EmailValidatorAdapter } from '../../adapters/validator/email-validator-adapter'
import { ValidationCompose, RequiredFieldValidation, CompareFieldValidation, EmailValidaton } from '../../../presentation/helpers/validators'
import { Validation } from '../../../presentation/protocols/validation'
export const makeSignUpValidation = (): ValidationCompose => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidaton('email', new EmailValidatorAdapter()))
  return new ValidationCompose(validations)
}
