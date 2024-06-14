import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { DatabaseModulemySQL } from '@app/shared';
import { TagsSTOCK, UserSTOCK } from '../../models';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { TagRepositorymySQL, UserRepositorySQL } from './tags.repository';

@Module({
  imports: [
    DatabaseModulemySQL,
    DatabaseModulemySQL.forFeature([UserSTOCK, TagsSTOCK]),
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [TagsResolver, TagsService, UserRepositorySQL, TagRepositorymySQL],
})
export class TagsModule {}
