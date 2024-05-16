import NodeCache = require('node-cache');

export class RateLimiter implements IRateLimiter {
  private readonly client: NodeCache;
  private readonly limits: Limit[];

  constructor(client: NodeCache) {
    this.client = client;
    this.limits = [
      {
        type: 'STATUS',
        expiresAt: 120,
        maximum: 2,
        count: 0,
      },
      {
        type: 'NEWS',
        expiresAt: 86400,
        maximum: 1,
        count: 0,
      },
      {
        type: 'MARKETING',
        expiresAt: 3600,
        maximum: 3,
        count: 0,
      },
    ];
  }

  async check(key: string, type: LimitType): Promise<boolean> {
    const limit = this.limits.find(l => l.type === type);
    if (!limit) {
      throw new Error('Unsupported type - ${type}');
    }
    
    let cachedV: Limit = await this.client.get(key) ?? limit ;
    
    if (cachedV.count >= limit.maximum) {
      return false;
    }

    cachedV.count = cachedV.count + 1;

    await this.client.set(key, cachedV, limit.expiresAt);
    return true;
  }

}

export interface IRateLimiter {
  check(key: string, type: LimitType): Promise<boolean>
}

export interface Limit {
  type: LimitType;
  expiresAt: number;
  maximum: number;
  count: number;
}

export type LimitType = 'STATUS' | 'NEWS' | 'MARKETING';
