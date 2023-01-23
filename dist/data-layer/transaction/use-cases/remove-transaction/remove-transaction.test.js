import { makeSutDeleteTransaction } from './makeSut';
describe('RemoveTransaction', () => {
    it('should call methodDeleteTransaction with correct params', async () => {
        const { sut, methodDeleteTransactionSpy, urlSpy, transactionIdSpy } = makeSutDeleteTransaction();
        const urlDelete = `${urlSpy}/${transactionIdSpy}`;
        await sut.removeTransaction(urlDelete);
        expect(methodDeleteTransactionSpy).toHaveBeenCalledWith(urlDelete);
    });
    it('should return promise status 200', async () => {
        const { sut, urlSpy, transactionIdSpy } = makeSutDeleteTransaction();
        const urlDelete = `${urlSpy}/${transactionIdSpy}`;
        const response = await sut.removeTransaction(urlDelete);
        expect(response.status).toBe(200);
    });
    it('it should return status 400 even when there is an error in the api, it does not display status 500 to the user', async () => {
        const { sut, urlSpy, transactionIdSpy } = makeSutDeleteTransaction({
            methodDeleteTransactionSpy: () => {
                throw new Error();
            }
        });
        const urlDelete = `${urlSpy}/${transactionIdSpy}`;
        const response = await sut.removeTransaction(urlDelete);
        expect(response.status).toBe(400);
    });
});
