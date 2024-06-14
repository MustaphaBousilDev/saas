import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached_item', { key: 32 });
    //for deleting cache
    await this.cacheManager.del('cached_item');
    //for delete everything inside cache
    await this.cacheManager.reset();
    const cachedItem = await this.cacheManager.get('cached_item');
    console.log('hhhh', cachedItem);
    return 'Hello';
  }
}
