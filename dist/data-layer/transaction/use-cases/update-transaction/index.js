export class UpdateNewTransactions {
    constructor(url, methodPut) {
        this.url = url;
        this.methodPut = methodPut;
    }
    async put(body) {
        try {
            const response = await this.methodPut(this.url, body);
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
