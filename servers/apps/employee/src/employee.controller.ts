import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserRepositorymySQL } from './employee.repository';
import { UserEMP } from './models/users.schema';
import { CurrentUser, JwtAuthGuard, Roles } from '@app/shared';
import { EmployeeDtoInput } from './dto/employee.input.dto';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { EmployeeDtoUpdate } from './dto/employee.update.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly userRepository: UserRepositorymySQL,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles('Admin')
  async create(
    @Body() createReservationDto: EmployeeDtoInput,
    @CurrentUser() user: UserInfoDto,
  ) {
    console.log(
      '###################hhhh from controller############################',
    );
    return this.employeeService.create(createReservationDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    console.log('#####################"""""""find all');
    const allEMp = await this.employeeService.findAll();
    console.log('controller', allEMp);
    return allEMp;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string | number) {
    return this.employeeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string | number,
    @Body() updateReservationDto: EmployeeDtoUpdate,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.employeeService.update(id, updateReservationDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string | number) {
    return this.employeeService.remove(id);
  }

  @MessagePattern('createUserComminicate')
  async createUser(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(' ########################## success message from employee ');
    console.log(' ########################## success  ');
    console.log(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //telling RabbitMQ that it has been successfully received and processed. This is important in message queue systems to prevent messages from being reprocessed in case of failures.
    channel.ack(originalMsg);
    const user = new UserEMP({
      ...data,
    });
    return this.userRepository.create(user);
  }
}
