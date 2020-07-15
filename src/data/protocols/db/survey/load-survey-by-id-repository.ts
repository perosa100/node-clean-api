import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyByIdRepository {
  loadByID (id: string): Promise<SurveyModel>
}
