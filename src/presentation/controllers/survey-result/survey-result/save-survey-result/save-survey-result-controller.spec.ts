import { HttpRequest, LoadSurveyById, SurveyModel } from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})
const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveById = (): LoadSurveyById => {
  class LoadSuveryByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSuveryByIdStub()
}

type SutTypes ={
  sut: SaveSurveyResultController
  loadSuveryByIdStub: LoadSurveyById
}
const makeSut = (): SutTypes => {
  const loadSuveryByIdStub = makeLoadSurveById()
  const sut = new SaveSurveyResultController(loadSuveryByIdStub)
  return {
    sut,
    loadSuveryByIdStub
  }
}

describe('SaveSurveyResultController', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSuveryByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSuveryByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
