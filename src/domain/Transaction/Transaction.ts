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

  formatTransaction(transaction: TransactionDataTypes) {
    return {
      id: transaction.id,
      amount: transaction.amount,
      date: transaction.date,
      category: transaction.category,
      type: transaction.type,
      name: transaction.name
    }
  }

  async list() {
    const listTransaction = await this.getTransactionListApi()
    const formatList = listTransaction.map((transaction) =>
      this.formatTransaction(transaction)
    )
    this.listTransaction = formatList
    return formatList
  }

  async create(transaction: TransactionDataTypes) {
    const objTransaction = new TransactionEntity(
      transaction.id,
      transaction.amount,
      transaction.date,
      transaction.category,
      transaction.type,
      transaction.name
    ).create()

    await this.createTransactionApi(objTransaction)
    await this.list()
  }

  async delete(id: string) {
    if (!id) throw new Error('Id is required to delete')
    await this.deleteTransactionApi(id)
    await this.list()
  }

  async update(transaction: TransactionDataTypes) {
    const objTransaction = new TransactionEntity(
      transaction.id,
      transaction.amount,
      transaction.date,
      transaction.category,
      transaction.type,
      transaction.name
    ).update()

    await this.updateTransactionApi(objTransaction)
    await this.list()
  }

  get getList() {
    return this.listTransaction
  }
}
