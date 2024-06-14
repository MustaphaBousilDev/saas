import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/shared/logger';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ThrottlerModule.forRootAsync({
    //   useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
    //     throttlers: {
    //       limit: configService.getOrThrow<number>('UPLOAD_RATE_LIMIT'),
    //       ttl: configService.getOrThrow<number>('UPLOAD_RATE_TTL'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    LoggerModule,
  ],
  controllers: [S3Controller],
  providers: [
    S3Service,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // }
  ],
})
export class S3Module {}
