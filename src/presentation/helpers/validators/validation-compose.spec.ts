import { MissingParamError } from './../../errors/missing-param-error'
import { ValidationCompose } from './validation-compose'
import { Validation } from './validation'
describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validateStub = new ValidationStub()
    const sut = new ValidationCompose([validateStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
