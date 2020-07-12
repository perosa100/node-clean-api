import { Middleware, HttpRequest, HttpResponse } from './../protocols'
import { AccessDeniedError } from './../errors/acess-denied-error'
import { forbidden } from './../helpers/http/http-helper'
export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
