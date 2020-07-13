import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { ValidationCompose, RequiredFieldValidation } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validation/validators/validation-compose')

describe('addSurveyValidation Factory', () => {
  test('Should call ValidationCompose with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationCompose).toHaveBeenCalledWith(validations)
  })
})
