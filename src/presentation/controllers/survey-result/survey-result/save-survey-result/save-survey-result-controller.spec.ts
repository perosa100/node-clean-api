import { SaveSurveyResultController } from './save-survey-result-controller'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import {
  forbidden,
  serverError,
  ok
} from '@/presentation/helpers/http/http-helper'
import {
  HttpRequest,
  LoadSurveyById,
  SurveyModel,
  SaveSurveyResult,
  SaveSurveyResultParams,
  SurveyResultModel
} from './save-survey-result-controller-protocols'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
})
const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  surveyId: 'valid_survey_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 1,
      isCurrentAccountAnswer: false,
      percent: 10
    }
  ],
  date: new Date()
})

const makeLoadSurveById = (): LoadSurveyById => {
  class LoadSuveryByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSuveryByIdStub()
}

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSuveryByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}
const makeSut = (): SutTypes => {
  const loadSuveryByIdStub = makeLoadSurveById()
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(
    loadSuveryByIdStub,
    saveSurveyResultStub
  )
  return {
    sut,
    loadSuveryByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSuveryByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSuveryByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 403 if LoadSurveyById  return null', async () => {
    const { sut, loadSuveryByIdStub } = makeSut()
    jest
      .spyOn(loadSuveryByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSuveryByIdStub } = makeSut()
    jest
      .spyOn(loadSuveryByIdStub, 'loadById')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_survey_id'
      },
      body: {
        answer: 'wrong_answer'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('Should call save SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      surveyId: 'any_survey_id',
      accountId: 'any_account_id',
      date: new Date(),
      answer: 'any_answer'
    })
  })

  test('Should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeSurveyResult()))
  })
})
