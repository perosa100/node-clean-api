import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { LoadSurveys } from '@/domain/usecases/load-surveys'
import { SurveyModel } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller-protocols'
export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
