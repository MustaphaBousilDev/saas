import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth';
import { UseCasesModule } from '@app/useCases/usecases.module';
import { JwtModule } from '../services/jwt';
import { RoleController } from './role';
import { PermissionController } from './permissions';
import { UserController } from './user';
import { ResourceController } from './resources';
import { PolicyController } from './policies';
import { IAMController } from './iam/iam.controller';

@Module({
  imports: [
    UseCasesModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AuthController,
    RoleController,
    PermissionController,
    UserController,
    ResourceController,
    PolicyController,
    IAMController,
  ],
  providers: [],
  exports: [],
})
export class ControllerModule {}
