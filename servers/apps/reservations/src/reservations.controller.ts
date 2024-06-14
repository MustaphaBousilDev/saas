import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
//import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard, Roles, CurrentUser } from '@app/shared';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserRepositorySQL } from './resources/users.repository';
import { UserRES as UserReservation } from './models/users.mysql.entity';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly usersRepository: UserRepositorySQL,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @Roles('Admin')
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: UserInfoDto,
  ) {
    console.log('###################hhhh############################');
    return this.reservationsService.create(createReservationDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string | number) {
    return this.reservationsService.findOne(id);
  }

  /*@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string | number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }*/

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string | number) {
    return this.reservationsService.remove(id);
  }

  @MessagePattern('createUserComminicate')
  async createUser(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(' ########################## success message ');
    console.log(' ########################## success  ');
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
}
