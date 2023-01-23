import { AddNewTransaction } from '.';
export const makeSutAddNewTransaction = (params) => {
    const dataSpy = {
        name: 'any_name',
        amount: 100,
        type: 'deposit',
        category: 'any_category'
    };
    const url = params?.url || 'any_url';
    const methodPost = params?.methodPost || jest.fn().mockResolvedValue({ status: 200 });
    return {
        sut: new AddNewTransaction(url, methodPost),
        urlSpy: url,
        methodPostSpy: methodPost,
        dataSpy
    };
};
