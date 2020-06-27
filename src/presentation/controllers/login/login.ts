import { EmailValidator } from './../../protocols/email-validator'
import { MissingParamError } from './../../errors'
import { Controller, HttpRequest, HttpResponse } from './../../protocols'
import { badRequest } from '../../helpers/http-helper'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValitador: EmailValidator) {
    this.emailValidator = emailValitador
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }

    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
    this.emailValidator.isValid(httpRequest.body.email)
  }
}
