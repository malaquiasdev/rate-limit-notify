import { Notification, Notify } from '../index'; 

describe('Notification', () => {
  let mockRateLimiter = {
    check: jest.fn(),
  }   
  
  let mockGateway = {
    send: jest.fn(),
  }

  let notification: Notification;

  beforeEach(() => {
    notification = new Notification(mockRateLimiter, mockGateway);
  });

  it('throws error if rate limit check fails', async () => {
    const notify: Notify = { type: "NEWS", userId: 'mockedUser', message: 'Hello!' };
    
    mockRateLimiter.check.mockReturnValueOnce(Promise.resolve(false)); 

    await expect(notification.send(notify)).rejects.toThrowError(
      'Rate limit exceeded for user: mockedUser, type: NEWS'
    );

    expect(mockRateLimiter.check).toHaveBeenCalledWith(`${notify.userId}-${notify.type}`, notify.type);
    expect(mockGateway.send).not.toHaveBeenCalled();
  });

  it('sends notification if rate limit allows and gateway succeeds', async () => {
    const notify: Notify = { type: "NEWS", userId: 'mockedUser', message: 'Hello!' };

    mockRateLimiter.check.mockReturnValueOnce(Promise.resolve(true));
    mockGateway.send.mockReturnValueOnce(Promise.resolve()); 

    const success = await notification.send(notify);
    expect(success).toBe(true);

    expect(mockRateLimiter.check).toHaveBeenCalledWith(`${notify.userId}-${notify.type}`, notify.type);
    expect(mockGateway.send).toHaveBeenCalledWith(notify.userId, notify.message);
  });
});
