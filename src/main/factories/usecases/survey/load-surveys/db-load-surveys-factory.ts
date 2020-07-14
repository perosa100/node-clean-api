import { DbLoadSurveys } from './../../../../../data/usecases/load-surveys/db.load-surveys'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveysMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveysMongoRepository)
}
