import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserTASKS as UserReservation } from './models/users.repository';
import { UserRepositorySQL } from './resources/users.repository';
@Controller()
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersRepository: UserRepositorySQL,
  ) {}

  @MessagePattern('createUserComminicate')
  async createUser(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(' ########################## success message org ggggq');
    console.log(' ########################## success  orgs');
    console.log(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //telling RabbitMQ that it has been successfully received and processed. This is important in message queue systems to prevent messages from being reprocessed in case of failures.
    channel.ack(originalMsg);
    const user = new UserReservation({
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
