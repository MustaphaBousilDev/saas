import { Controller, Get, UseInterceptors } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserRepositorySQL } from './resources/users/users.repository';
import { UserSTOCK } from './models';
import { CacheService } from './cache/cache.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('stock')
export class OrganizationController {
  constructor(
    private readonly usersRepository: UserRepositorySQL,
    private readonly cacheService: CacheService,
  ) {}
  @Get('cache')
  async cacheExample(): Promise<any> {
    // Set a value in Redis
    return this.cacheService.getHello();
  }

  @MessagePattern('createUserComminicate')
  async createUser(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(' ########################## success message org ggggq');
    console.log(' ########################## success  orgs');
    console.log(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //telling RabbitMQ that it has been successfully received and processed. This is important in message queue systems to prevent messages from being reprocessed in case of failures.
    channel.ack(originalMsg);
    const user = new UserSTOCK({
      ...data,
    });
    return this.usersRepository.create(user);
  }

  @MessagePattern('createEmployeeCuminicate')
  async createEmployee(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(' ########################## success message from employee ');
    console.log(' ########################## success  ');
    console.log(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //telling RabbitMQ that it has been successfully received and processed. This is important in message queue systems to prevent messages from being reprocessed in case of failures.
    channel.ack(originalMsg);
    /*const employee = new Employee({
      ...data,
    });*/
    //return this.userRepository.create(user);
    console.log(data);
  }
}
