export class TotalIncomingTransactions {
    filterTotalIncomingTransactions(transactions) {
        const total = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'deposit') {
                return acc + transaction.amount;
            }
            return acc;
        }, 0);
        return total;
    }
}
