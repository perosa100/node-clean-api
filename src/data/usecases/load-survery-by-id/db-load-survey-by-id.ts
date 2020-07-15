import { LoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { SurveyModel } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

  async loadById (id: string): Promise<SurveyModel> {
    await this.loadSurveyByIdRepository.loadByID(id)
    return null
  }
}
