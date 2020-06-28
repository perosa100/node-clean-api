import { MissingParamError } from './../../errors/missing-param-error'
import { ValidationCompose } from './validation-compose'
import { Validation } from './validation'
const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
interface SutTypes {
  sut: ValidationCompose
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationCompose([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
