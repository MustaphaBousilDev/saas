import { Controller, UsePipes } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import * as AWS from 'aws-sdk';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Controller()
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}
  SES_CONFIG = {
    credentials: {
      accessKeyId: this.configService.get<string>('ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY'),
    },
    region: this.configService.get<string>('REGION_AWS'),
  };
  // AWS_SES = new AWS.SES(this.SES_CONFIG);
  sesClient = new SESClient(this.SES_CONFIG);
  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    console.log('############# DATA######################');
    console.log(data);
    console.log('#########################################');
    await this.sendEmail('bousilmustapha@gmail.com', data.text);
  }

  async sendEmail(recipientEmail: string, text: string) {
    const params = {
      Source: this.configService.get<string>('AWS_SES_SENDER'),
      Destination: {
        ToAddresses: [recipientEmail],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: '<h1>this is the fucking body of my email</h1>',
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'This is the body of my email!',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${text}`,
        },
      },
    };
    try {
      // const res = await this.AWS_SES.sendEmail(params).promise();
      // console.log('################ fucking success send email', res);
      const sendEmailCommand = new SendEmailCommand(params);
      const res = await this.sesClient.send(sendEmailCommand);
      console.log('################ fucking success send email', res);
    } catch (error) {
      console.log(
        '####################### fucking error ############################',
      );
      console.log(error);
    }
  }
}
