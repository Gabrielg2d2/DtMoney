export class DeleteTransaction {
  execute(id: string) {
    if (!id) {
      throw new Error(
        'Invalid transaction id to delete. Please check the values of the transaction id.'
      )
    }
    return id
  }
}
