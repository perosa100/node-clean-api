import { EmailValidaton, CompareFieldValidation, ValidationCompose, RequiredFieldValidation } from '../../../presentation/helpers/validators'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
jest.mock('../../../presentation/helpers/validators/validation-compose')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('SignUpValidation Factory', () => {
  test('Should call ValidationCompose with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidaton('email', makeEmailValidator()))
    expect(ValidationCompose).toHaveBeenCalledWith(validations)
  })
})
