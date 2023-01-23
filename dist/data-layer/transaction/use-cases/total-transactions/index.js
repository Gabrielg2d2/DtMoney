export class TotalTransactions {
    filterTotalTransactions(transactions) {
        const total = transactions.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
        return total;
    }
}
