import { RateLimiter, IRateLimiter } from "../index";


describe("RateLimiter", () => {
  let mockCache: {
    get: jest.Mock;
    set: jest.Mock;
  };
  let rateLimiter: IRateLimiter;

  beforeEach(() => {
    mockCache = {
      get: jest.fn(),
      set: jest.fn()
    }
    rateLimiter = new RateLimiter(mockCache as any);
  })

  describe('STATUS', () => {
    test('should allows request', async ()=> {
      const key = 'mockUserId'
      const type = 'STATUS'

      mockCache.get.mockReturnValueOnce(undefined)
      const allowed = await rateLimiter.check(key, type)
      expect(allowed).toBeTruthy()
    })
    
    test('should allows 2 requests', async () => {
      const key = 'mockUserId'
      const type = 'STATUS'

      mockCache.get.mockReturnValueOnce(undefined)
      await rateLimiter.check(key, type)

      const allowed = await rateLimiter.check(key, type)
      expect(allowed).toBeTruthy()
      expect(mockCache.set).toHaveBeenCalledWith(key, { type, expiresAt: 120, maximum: 2, count: 2}, 120);
    })

    test('should not allow when count is eq to maximum', async () => {
      const key = 'mockUserId'
      const type = 'STATUS'

      mockCache.get.mockReturnValueOnce(undefined)
      await rateLimiter.check(key, type)
      await rateLimiter.check(key, type)
      
      const allowed = await rateLimiter.check(key, type)
      expect(allowed).toBeFalsy()
      expect(mockCache.set).toHaveBeenCalledTimes(2)
    })
  })
})
