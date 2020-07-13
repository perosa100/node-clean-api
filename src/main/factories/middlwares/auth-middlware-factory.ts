import { makeDbLoadAccountByToken } from './../usecases/load-account-by-token/db-load-account-by-token-factory'
import { AuthMiddleware } from './../../../presentation/middlewares/auth-middleware'
import { Middleware } from './../../../presentation/protocols/middleware'

export const makeAuthMiddlare = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
