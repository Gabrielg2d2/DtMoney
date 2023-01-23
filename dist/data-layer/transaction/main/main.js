import { api } from '../../../service/api';
import { ListTransactions, AddNewTransaction, RemoveTransaction, UpdateNewTransactions, TotalTransactions, TotalIncomingTransactions, TotalOutgoingTransactions } from '../use-cases';
export class MainTransaction {
    constructor() {
        this.url = `${process.env.REACT_APP_API_URL}/transactions`;
    }
    handleTotalTransactions(transactions) {
        const totalTransactions = new TotalTransactions();
        const total = totalTransactions.filterTotalTransactions(transactions);
        return total;
    }
    handleTotalIncomingTransactions(transactions) {
        const totalIncomingTransactions = new TotalIncomingTransactions();
        const total = totalIncomingTransactions.filterTotalIncomingTransactions(transactions);
        return total;
    }
    handleTotalOutgoingTransactions(transactions) {
        const totalOutgoingTransactions = new TotalOutgoingTransactions();
        const total = totalOutgoingTransactions.filterTotalOutgoingTransactions(transactions);
        return total;
    }
    async handleListTransactions() {
        const listTransactions = new ListTransactions(this.url, api.get);
        const response = await listTransactions.execute();
        this.handleTotalTransactions(response.data);
        this.handleTotalIncomingTransactions(response.data);
        this.handleTotalOutgoingTransactions(response.data);
        return response;
    }
    async handleCreateTransaction(data) {
        const addNewTransaction = new AddNewTransaction(this.url, api.post);
        const response = await addNewTransaction.add(data);
        if (response.status === 201) {
            const responseUpdateListTransaction = await this.handleListTransactions();
            return {
                status: response.status,
                data: responseUpdateListTransaction.data
            };
        }
        return {
            status: 400,
            data: []
        };
    }
    async handleDeleteTransaction(id) {
        const deleteTransaction = new RemoveTransaction(api.delete);
        const urlDelete = `${this.url}/${id}`;
        const response = await deleteTransaction.removeTransaction(urlDelete);
        if (response.status === 200) {
            const responseUpdateListTransaction = await this.handleListTransactions();
            return {
                status: response.status,
                data: responseUpdateListTransaction.data
            };
        }
        return {
            status: 400,
            data: []
        };
    }
    async handleUpdateTransaction(id, body) {
        const urlUpdate = `${this.url}/${id}`;
        const updateTransaction = new UpdateNewTransactions(urlUpdate, api.put);
        const mainSpy = jest.spyOn(updateTransaction, 'put');
        mainSpy.mockResolvedValue({
            status: 200,
            data: []
        });
        const response = await updateTransaction.put(body);
        if (response.status === 200) {
            const responseUpdateListTransaction = await this.handleListTransactions();
            return {
                status: response.status,
                data: responseUpdateListTransaction.data
            };
        }
        return {
            status: 400,
            data: []
        };
    }
}
