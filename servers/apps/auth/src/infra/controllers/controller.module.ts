import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth';
import { UseCasesModule } from '@app/useCases/usecases.module';
import { JwtModule } from '../services/jwt';
import { RoleController } from './role';
import { PermissionController } from './permissions';

@Module({
  imports: [
    UseCasesModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController, RoleController, PermissionController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
