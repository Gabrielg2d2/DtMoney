import { TotalOutgoingTransactions } from '.';
describe('TotalOutgoingTransactions', () => {
    it('should return the total of outgoing transactions', () => {
        const totalOutgoingTransactions = new TotalOutgoingTransactions();
        const transactions = [
            {
                id: '1',
                name: 'Salary',
                type: 'deposit',
                category: 'Salary',
                amount: 1000
            },
            {
                id: '2',
                name: 'Salary',
                type: 'deposit',
                category: 'Salary',
                amount: 1000
            },
            {
                id: '3',
                name: 'Salary',
                type: 'withdraw',
                category: 'Salary',
                amount: 100
            },
            {
                id: '4',
                name: 'Salary',
                type: 'withdraw',
                category: 'Salary',
                amount: 1000
            }
        ];
        const total = totalOutgoingTransactions.filterTotalOutgoingTransactions(transactions);
        expect(total).toBe(1100);
    });
});
