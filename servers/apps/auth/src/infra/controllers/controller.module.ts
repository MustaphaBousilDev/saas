import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth';
import { UseCasesModule } from '@app/useCases/usecases.module';

@Module({
  imports: [
    UseCasesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
