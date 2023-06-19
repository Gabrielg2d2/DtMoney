import { HttpClient } from './HttpClient'

describe('HttpClient', () => {
  const httpClient = new HttpClient()
  const mockFetch = jest.fn()
  const mockFetchResponse = {
    json: jest.fn().mockResolvedValue({ message: 'Hello World' })
  }
  const mockFetchPromise = Promise.resolve(mockFetchResponse)

  beforeEach(() => {
    global.fetch = mockFetch
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(httpClient).toBeDefined()
  })

  it('should be able to get', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchPromise)
    const response = await httpClient.get('http://localhost:3333')
    expect(response).toEqual({ message: 'Hello World' })
  })

  it('should be able to post', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchPromise)
    const response = await httpClient.post('http://localhost:3333', {
      message: 'Hello World'
    })
    expect(response).toEqual({ message: 'Hello World' })
  })

  it('should be able to put', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchPromise)
    const response = await httpClient.put('http://localhost:3333', {
      message: 'Hello World'
    })
    expect(response).toEqual({ message: 'Hello World' })
  })

  it('should be able to delete', async () => {
    mockFetch.mockResolvedValueOnce(mockFetchPromise)
    const response = await httpClient.delete('http://localhost:3333')
    expect(response).toEqual({ message: 'Hello World' })
  })
})
