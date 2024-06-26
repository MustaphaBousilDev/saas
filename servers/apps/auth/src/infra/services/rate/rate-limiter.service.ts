import { Injectable } from '@nestjs/common';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimiterService {
  private rateLimiter: RateLimiterMemory;

  constructor() {
    this.rateLimiter = new RateLimiterMemory({
      points: 10, // Default number of points
      duration: 60, // Default duration in seconds
    });
  }

  async consume(key: string): Promise<boolean> {
    //console.log('### its coming from here');
    try {
      await this.rateLimiter.consume(key);
      //console.log('true -------------');
      return true; // Request allowed
    } catch (e) {
      //console.log('false --------------------');
      return false; // Request denied
    }
  }
}
