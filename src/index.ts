import NodeCache = require('node-cache');
import {RateLimiter} from './rate_limiter/index';

console.log('running!');

(async () => {
  try {
    const limiter = new RateLimiter(new NodeCache());
    const result = await limiter.check('test', 'STATUS');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();

