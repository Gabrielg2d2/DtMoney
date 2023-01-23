import { makeSutAddNewTransaction } from './makeSut'

describe('AddNewTransaction', () => {
  it('should call methodPost with correct values', async () => {
    const { sut, urlSpy, methodPostSpy, dataSpy } = makeSutAddNewTransaction()

    await sut.add(dataSpy)

    expect(methodPostSpy).toHaveBeenCalledWith(urlSpy, dataSpy)
  })

  it('should return promise status 200', async () => {
    const { sut, dataSpy } = makeSutAddNewTransaction()

    const response = await sut.add(dataSpy)

    expect(response.status).toBe(200)
  })

  it('should return promise status 400', async () => {
    const { sut, dataSpy } = makeSutAddNewTransaction({
      methodPost: jest.fn().mockResolvedValue({
        status: 400
      })
    })

    const response = await sut.add(dataSpy)

    expect(response.status).toBe(400)
  })

  it('should return promise status different 200 or 400', async () => {
    const { sut, dataSpy } = makeSutAddNewTransaction({
      methodPost: jest.fn().mockRejectedValue({
        status: 500
      })
    })

    const response = await sut.add(dataSpy)

    expect(response.status).toBe(400)
  })
})
