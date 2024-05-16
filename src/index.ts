import NodeCache = require('node-cache');
import {RateLimiter} from './rate_limiter/index';
import {Gateway} from './gateway';
import {Notification, Notify} from './notification';

console.log('running!');

(async () => {
  try {
    const not1: Notify = {
      type: 'STATUS',
      userId: '1',
      message: 'online',
    };
    const gateway = new Gateway();
    const limiter = new RateLimiter(new NodeCache());
    const notification = new Notification(limiter, gateway);
    const result1 = await notification.send(not1);
    console.log('1', result1);
    const result2 = await notification.send(not1);
    console.log('2', result2);
    const result3 = await notification.send(not1);
    console.log('3', result3);
  } catch (error) {
    console.error(error);
  }
})();
