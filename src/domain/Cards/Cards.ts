type GetCardsAPIType = () => Promise<any>

export class Cards {
  private totalIncomingTransactions: 0
  private totalOutgoingTransactions: 0
  private totalTransactions: 0

  constructor(private readonly getCardsAPI: GetCardsAPIType) {}

  async getCards() {
    const response = await this.getCardsAPI()
    if (!response) {
      this.totalIncomingTransactions = 0
      this.totalOutgoingTransactions = 0
      this.totalTransactions = 0
    }

    this.totalIncomingTransactions = response.totalIncomingTransactions
    this.totalOutgoingTransactions = response.totalOutgoingTransactions
    this.totalTransactions = response.totalTransactions
  }

  get totalCards() {
    return {
      totalIncomingTransactions: this.totalIncomingTransactions,
      totalOutgoingTransactions: this.totalOutgoingTransactions,
      totalTransactions: this.totalTransactions
    }
  }
}
