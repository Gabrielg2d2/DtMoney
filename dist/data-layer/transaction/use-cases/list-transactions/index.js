export class ListTransactions {
    constructor(url, methodGet) {
        this.url = url;
        this.methodGet = methodGet;
    }
    async execute() {
        try {
            const response = await this.methodGet(this.url);
            return response;
        }
        catch (error) {
            return {
                status: 500,
                data: []
            };
        }
    }
}
