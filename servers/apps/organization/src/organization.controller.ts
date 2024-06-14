import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  InternalServerErrorException,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { UserRepositorySQLForRoom } from './resources/users/users.repository';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UserORG as UserReservation } from './models/users.mysql.entity';
import { CurrentUser, JwtAuthGuard, Roles, UPLOAD_S3 } from '@app/shared';
import { OrganizationInputDto } from './dto/organization.input.dto';
import { UserInfoDto } from '@app/shared/dto/userInfo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { map } from 'rxjs';
import * as fs from 'fs';
import { UpdateOrganizationInputDto } from './dto/organization.input.update.dto';
import { EmployeeRepositorySQL } from './remote/employee.repository';
//import { EmployeeORG } from './models/employee.schema';

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly usersRepository: UserRepositorySQLForRoom,
    @Inject(UPLOAD_S3)
    private readonly uploadLogoOrganization: ClientProxy,
    private readonly employeeRepository: EmployeeRepositorySQL,
  ) {}

  // @UseInterceptors(FileInterceptor('logo'))
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Post()
  async create(
    @Body() createOrganizationDto: OrganizationInputDto,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.organizationService.create(createOrganizationDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.organizationService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number | string,
    @Body() updateOrganizationDto: UpdateOrganizationInputDto,
    @CurrentUser() user: UserInfoDto,
  ) {
    return this.organizationService.update(id, updateOrganizationDto, user);
  }

  @UseGuards()
  @Get(':id')
  async findOne(@Param('id') id: string | number) {
    return this.organizationService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string | number) {
    return this.organizationService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/uploadLogo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLogo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 30000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(' #########hhh##qqq##sss#aq############ without communication');
    console.log(' #########hhh################# witout communication');
    try {
      console.log(file);
      const base64 = fs.readFileSync(file.originalname, 'base64');
      const buffer = Buffer.from(base64, 'base64');
      return { buffer };
    } catch (error) {
      console.error('Error reading file:', error);
      throw new InternalServerErrorException('Error reading file');
    }
    // const fileBuffer = fs.readFileSync(file.path);
    // console.log('#######filterBuffer', fileBuffer);
    // const base64String = fileBuffer.toString('base64');
    // console.log('###############################', base64String);
    // return { fileBuffer };
    // console.log(' ########################## ################### ');
    // console.log(' ########################## ########################');
    // return this.uploadLogoOrganization.send('upload_file_s3', { base64String });
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
