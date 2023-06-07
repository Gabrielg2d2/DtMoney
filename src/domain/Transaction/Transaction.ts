import {
  TransactionDataTypes,
  Transaction as TransactionEntity
} from '@/entity/Transaction/Transaction'
import {
  CreateType,
  DeleteType,
  ITransaction,
  ListType,
  UpdateType
} from './interfacesTransactions'

export class Transaction implements ITransaction {
  private listTransaction: TransactionDataTypes[] = []

  constructor(
    private readonly getTransactionListApi: ListType,
    private readonly createTransactionApi: CreateType,
    private readonly deleteTransactionApi: DeleteType,
    private readonly updateTransactionApi: UpdateType
  ) {}

  async list() {
    const listTransaction = await this.getTransactionListApi()
    this.listTransaction = listTransaction
    return listTransaction
  }

  async create(transaction: TransactionDataTypes) {
    const objTransaction = new TransactionEntity(
      transaction.id,
      transaction.amount,
      transaction.date,
      transaction.description,
      transaction.type
    ).execute()

    await this.createTransactionApi(objTransaction)
    await this.list()
  }

  async delete(id: string) {
    await this.deleteTransactionApi(id)
    await this.list()
  }

  async update(transaction: TransactionDataTypes) {
    const objTransaction = new TransactionEntity(
      transaction.id,
      transaction.amount,
      transaction.date,
      transaction.description,
      transaction.type
    ).execute()

    await this.updateTransactionApi(objTransaction)
    await this.list()
  }

  get getList() {
    return this.listTransaction
  }
}
