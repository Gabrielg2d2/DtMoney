export type DeleteTransactionApi = (id: string) => Promise<boolean>

export class DeleteTransaction {
  constructor(
    private readonly id: string,
    private readonly deleteTransaction: DeleteTransactionApi
  ) {}

  async execute() {
    if (!this.id) throw new Error('Id delete is required')
    return await this.deleteTransaction(this.id)
  }
}
