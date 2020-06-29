import { EmailValidaton } from '../../../presentation/helpers/validators/email-validation'
import { ValidationCompose } from '../../../presentation/helpers/validators/validation-compose'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation'
jest.mock('../../../presentation/helpers/validators/validation-compose')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
describe('LoginValidation Factory', () => {
  test('Should call ValidationCompose with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidaton('email', makeEmailValidator()))
    expect(ValidationCompose).toHaveBeenCalledWith(validations)
  })
})
