import { DbSaveSurveyResult } from '@/data/usecases/survery-result/db-save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SaveSurveyResult } from '@/data/usecases/survery-result/db-save-survey-result-protocols'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository)
}
