// import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
// //import { ConfigModule } from '../config/config.module';

// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       //imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         uri: configService.get('MONGODB_URI'),
//       }),
//       inject: [ConfigService], // Specify the dependencies that should be injected into the useFactory function
//     }),
//   ],
// })
// export class DatabaseModule {
//   static forFeature(models: ModelDefinition[]) {
//     return MongooseModule.forFeature(models);
//   }
//   /**
//    * When you use MongooseModule.forFeature(models) within a NestJS module, you are telling NestJS that this module will use Mongoose and will work with the specified Mongoose models.
//    * @Module({
//       imports: [
//         MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),(say module in reservations services)
//       ],
//       controllers: [UserController],
//       providers: [UserService],
//     })
//    */
// }
