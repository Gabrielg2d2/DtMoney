import { TotalTransactions } from '.';
describe('TotalTransactions', () => {
    it('should return the total of transactions', () => {
        const totalTransactions = new TotalTransactions();
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
                amount: 1000
            },
            {
                id: '4',
                name: 'Salary',
                type: 'withdraw',
                category: 'Salary',
                amount: 100
            }
        ];
        const total = totalTransactions.filterTotalTransactions(transactions);
        expect(total).toBe(3100);
    });
});
