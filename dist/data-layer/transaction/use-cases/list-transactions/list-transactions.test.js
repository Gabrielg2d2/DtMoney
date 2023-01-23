import { makeSutListTransactions } from './makeSut';
describe('ListTransactions', () => {
    it('should call methodGet with correct params', async () => {
        const { sut, urlSpy, methodGetSpy } = makeSutListTransactions();
        await sut.execute();
        expect(methodGetSpy).toHaveBeenCalledWith(urlSpy);
    });
    it('should return a ListTransactionsReturn on success, status 200', async () => {
        const { sut } = makeSutListTransactions();
        const response = await sut.execute();
        expect(response).toEqual({
            status: 200,
            data: [
                {
                    id: 'any_id',
                    name: 'any_name',
                    amount: 10,
                    type: 'deposit',
                    category: 'any_category'
                }
            ]
        });
    });
    it('should return status 400 and data with array empty', async () => {
        const { sut, methodGetSpy } = makeSutListTransactions();
        methodGetSpy.mockResolvedValueOnce({
            status: 400,
            data: []
        });
        const response = await sut.execute();
        expect(response).toEqual({
            status: 400,
            data: []
        });
    });
    it('should return status 500 for an error in the api call', async () => {
        const { sut, methodGetSpy } = makeSutListTransactions();
        methodGetSpy.mockRejectedValueOnce(new Error());
        const response = await sut.execute();
        expect(response).toEqual({
            status: 500,
            data: []
        });
    });
});
