import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
@Controller('upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(@UploadedFile() files: Express.Multer.File) {
    try {
      if (!files) {
        throw new Error('No file uploaded');
      }
      console.log('Uploaded file:', files.originalname);
      await this.s3Service.upload(files.originalname, files.buffer);
      return { message: 'File uploaded successfully' };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  @MessagePattern('upload_file_s3')
  async uploadS3(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(' ########################## success message upload ');
    console.log(' ########################## success  upload');
    console.log(data);
    console.log(' ########################## ################### ');
    console.log(' ########################## ########################');
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    //telling RabbitMQ that it has been successfully received and processed. This is important in message queue systems to prevent messages from being reprocessed in case of failures.
    channel.ack(originalMsg);
    return this.s3Service.upload(data.originalname, data.buffer);
  }
}
