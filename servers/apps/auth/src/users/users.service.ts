import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { map } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositorySQL } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import {
  EMPLOYEE_SERVICE,
  ORGANIZATION_SERVICE,
  RESERVATION_SERVICE,
  Role,
  STOCK_SERVICE,
  TASKS_SERVICE,
  User,
} from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepositorySQL,
    /*@Inject(RESERVATION_SERVICE)
    private readonly createUserReservation: ClientProxy,
    @Inject(ORGANIZATION_SERVICE)
    private readonly createUserOrganization: ClientProxy,
    @Inject(TASKS_SERVICE)
    private readonly createUserTasks: ClientProxy,
    @Inject(EMPLOYEE_SERVICE)
    private readonly createUserEmployee: ClientProxy,
    @Inject(STOCK_SERVICE)
    private readonly createUserStock: ClientProxy,*/
  ) {}
  async create(createUserDto: CreateUserDto) {
    console.log('services');
    console.log(createUserDto);
    await this.validateCreateUserDto(createUserDto);
    const user = new User({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      roles: createUserDto.roles?.map((roleDto) => new Role(roleDto)),
    });
    //const promises = [];
    console.log('user Service (((----', user);
    /*promises.push(
      this.createUserReservation
        .send('createUserResr', {
          ...createUserDto,
          password: undefined,
        })
        .toPromise(),
    );

    promises.push(
      this.createUserOrganization
        .send('createUserOrg', {
          ...createUserDto,
          password: undefined,
        })
        .toPromise(),
    );
    console.log('#### hhhhhhhhhhhhhhhhhhhhhhhh');
    await Promise.all(promises);*/
    /*this.createUserOrganization.emit('createUserComminicate', {
      ...createUserDto,
      password: undefined,
    });
    this.createUserReservation.emit('createUserComminicate', {
      ...createUserDto,
      password: undefined,
    });
    this.createUserTasks.emit('createUserComminicate', {
      ...createUserDto,
      password: undefined,
    });
    this.createUserEmployee.emit('createUserComminicate', {
      ...createUserDto,
      password: undefined,
    });
    this.createUserStock.emit('createUserComminicate', {
      ...createUserDto,
      password: undefined,
    });*/
    return this.usersRepository.create(user);
  }
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    console.log(user);
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentialss');
    }
    console.log('-----------------------------------------------------\n');
    console.log('--------------------------verify user \n');
    console.log('-----------------------------------------------------\n');
    //user.password = 'bitch local strategy';
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto, { roles: true });
  }
  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists.');
  }

  async findAll() {
    return this.usersRepository.find({});
  }
}
