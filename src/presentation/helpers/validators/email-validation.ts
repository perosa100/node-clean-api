import { Validation } from '../../protocols/validation'
import { EmailValidator } from '../../protocols/email-validator'
import { InvalidParamError } from '../../errors'

export class EmailValidaton implements Validation {
  constructor (private readonly fieldName: string,
    private readonly emailValidator: EmailValidator) {
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
