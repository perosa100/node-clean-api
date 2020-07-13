import { adaptMiddleware } from './../adapters/express-middlware-adapter'
import { makeAuthMiddlare } from './../factories/middlwares/auth-middlware-factory'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express.route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddlare('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
