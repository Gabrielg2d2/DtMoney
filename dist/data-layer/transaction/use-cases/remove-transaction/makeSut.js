import { RemoveTransaction } from '.';
export const makeSutDeleteTransaction = (params) => {
    const methodDeleteTransactionSpy = params?.methodDeleteTransactionSpy ||
        jest.fn().mockResolvedValue({ status: params?.statusSpy || 200 });
    const urlSpy = params?.urlSpy || 'any_url';
    const transactionIdSpy = params?.transactionIdSpy || 'any_transaction_id';
    const sut = new RemoveTransaction(methodDeleteTransactionSpy);
    return {
        sut,
        methodDeleteTransactionSpy,
        urlSpy,
        transactionIdSpy
    };
};
