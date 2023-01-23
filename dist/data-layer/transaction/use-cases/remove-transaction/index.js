export class RemoveTransaction {
    constructor(methodDeleteTransaction) {
        this.methodDeleteTransaction = methodDeleteTransaction;
    }
    async removeTransaction(url) {
        try {
            const response = await this.methodDeleteTransaction(url);
            return response;
        }
        catch (error) {
            return {
                status: 400,
                data: []
            };
        }
    }
}
