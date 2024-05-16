import NodeCache = require('node-cache');

export class RateLimiter {
  private readonly client: NodeCache;
  private readonly limits: Limit[];

  constructor(client: NodeCache) {
    this.client = client;
    this.limits = [
      {
        type: 'STATUS',
        expiresAt: 120,
        maximum: 2,
      },
      {
        type: 'NEWS',
        expiresAt: 86400,
        maximum: 1,
      },
      {
        type: 'MARKETING',
        expiresAt: 3600,
        maximum: 3,
      },
    ];
  }

  async check(key: string, type: LimitType): Promise<boolean> {
    const cachedV: Limit | undefined = await this.client.get(key);
    const limit = this.limits.find(l => l.type === type);
    if (!limit) {
      throw new Error('Unsupported type - ${type}');
    }

    if (cachedV) {
      return cachedV.maximum < limit.maximum;
    }

    await this.client.set(key, limit.expiresAt);
    return true;
  }
}

export interface Limit {
  type: LimitType;
  expiresAt: number;
  maximum: number;
}

export type LimitType = 'STATUS' | 'NEWS' | 'MARKETING';
