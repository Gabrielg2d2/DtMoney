import { makeSutUpdateNewTransactions } from './makesut'

describe('UpdateNewTransaction', () => {
  it('should call method put with params corrects', async () => {
    const { sut, urlSpy, methodPutSpy, dataSpy } =
      makeSutUpdateNewTransactions()

    await sut.put(dataSpy)

    expect(methodPutSpy).toHaveBeenCalledWith(urlSpy, dataSpy)
  })

  it('should return status corrects', async () => {
    const { sut, dataSpy } = makeSutUpdateNewTransactions()

    const response = await sut.put(dataSpy)

    expect(response.status).toBe(200)
  })

  it('should return status 400', async () => {
    const { sut, dataSpy } = makeSutUpdateNewTransactions({
      methodPutSpy: jest.fn().mockResolvedValue({
        status: 400,
        data: []
      })
    })

    const response = await sut.put(dataSpy)

    expect(response.status).toBe(400)
  })

  it('it should return status 400 even when there is an error in the api, we do not display error with status 500', async () => {
    const { sut, dataSpy } = makeSutUpdateNewTransactions({
      methodPutSpy: jest.fn().mockRejectedValue(new Error())
    })

    const response = await sut.put(dataSpy)

    expect(response.status).toBe(400)
  })
})
