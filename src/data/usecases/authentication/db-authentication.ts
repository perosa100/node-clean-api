import {
  Encrypter, AuthenticationModel,
  LoadAccountByEmailRepository,
  HashComparer,
  UpdateAcessTokenRepository,
  Authentication
} from './db-authentication-protocols'
export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter
  private readonly updateAcessTokenRepository: UpdateAcessTokenRepository
  constructor (loadAccountByEmailRepository:
  LoadAccountByEmailRepository,
  hashComparer: HashComparer,
  encrypter: Encrypter,
  updateAcessTokenRepository: UpdateAcessTokenRepository) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
    this.encrypter = encrypter
    this.updateAcessTokenRepository = updateAcessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accesToken = await this.encrypter.encrypt(account.id)
        await this.updateAcessTokenRepository.update(account.id, accesToken)
        return accesToken
      }
    }
    return null
  }
}
