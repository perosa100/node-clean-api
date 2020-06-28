import { unauthorized } from './../../helpers/http-helper'
import { Authentication } from './../../../domain/usecases/authentication'
import { EmailValidator } from './../../protocols/email-validator'
import { MissingParamError, InvalidParamError } from './../../errors'
import { Controller, HttpRequest, HttpResponse } from './../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValitador: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValitador
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['email', 'password']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return (badRequest(new InvalidParamError('email')))
      }
      const acessToken = await this.authentication.auth(email, password)
      if (!acessToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
