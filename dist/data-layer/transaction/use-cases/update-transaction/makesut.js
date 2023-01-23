import { UpdateNewTransactions } from '.';
export const makeSutUpdateNewTransactions = (params) => {
    const urlSpy = params?.urlSpy || 'url_any';
    const methodPutSpy = params?.methodPutSpy ||
        jest.fn().mockResolvedValue({
            status: 200
        });
    const statusSpy = params?.statusSpy || 200;
    const dataSpy = {
        name: 'any_name',
        amount: 100,
        type: 'deposit',
        category: 'any_category'
    };
    const sut = new UpdateNewTransactions(urlSpy, methodPutSpy);
    return {
        sut,
        urlSpy,
        methodPutSpy,
        statusSpy,
        dataSpy
    };
};
