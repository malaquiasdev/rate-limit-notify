import {IGateway} from '../gateway';
import {LimitType, IRateLimiter} from '../rate_limiter';

export class Notification {
  private readonly rateLimiter: IRateLimiter;
  private readonly gateway: IGateway;

  constructor(limiter: IRateLimiter, gateway: IGateway) {
    this.rateLimiter = limiter;
    this.gateway = gateway;
  }

  async send(notify: Notify): Promise<boolean> {
    const key = `${notify.userId}-${notify.type}`;
    const allowed = await this.rateLimiter.check(key, notify.type);

    if (!allowed) {
      throw new Error(
        `Rate limit exceeded for user: ${notify.userId}, type: ${notify.type}`
      );
    }

    await this.gateway.send(notify.userId, notify.message);
    return true;
  }
}

export interface Notify {
  type: LimitType;
  message: string;
  userId: string;
}
