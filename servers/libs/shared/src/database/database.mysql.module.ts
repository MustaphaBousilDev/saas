import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      //imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        host: configService.getOrThrow('POSTGRES_HOST_LOCAL_PROJECT'),
        database: configService.getOrThrow('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService], // Specify the dependencies that should be injected into the useFactory function
    }),
  ],
})
export class DatabaseModulemySQL {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
  /**
   * When you use MongooseModule.forFeature(models) within a NestJS module, you are telling NestJS that this module will use Mongoose and will work with the specified Mongoose models.
   * @Module({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),(say module in reservations services)
      ],
      controllers: [UserController],
      providers: [UserService],
    })
   */
}
