export class TotalOutgoingTransactions {
    filterTotalOutgoingTransactions(transactions) {
        const total = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'withdraw') {
                return acc + transaction.amount;
            }
            return acc;
        }, 0);
        return total;
    }
}
