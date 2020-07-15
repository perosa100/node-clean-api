import { AccountModel } from '@/domain/models/account'

export type AddAccountModel = Omit<AccountModel, 'id'>

interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
