export class AddNewTransaction {
    constructor(url, methodPost) {
        this.url = url;
        this.methodPost = methodPost;
    }
    async add(body) {
        try {
            const response = await this.methodPost(this.url, body);
            return response;
        }
        catch (error) {
            return {
                status: 400
            };
        }
    }
}
