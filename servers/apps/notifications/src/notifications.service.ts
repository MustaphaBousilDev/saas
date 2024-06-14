import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  // private readonly transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2', //OAuth2 is the authentication type that we are using for gmail accounts(we are using gmail accounts to send emails)
  //     user: this.configService.get('SMTP_USER'),
  //     clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //     clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //     refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
  //   },
  // });
  // async notifyEmail({ email, text }: NotifyEmailDto) {
  //   console.log(`Sending notification to ${email}`);
  //   await this.transporter.sendMail({
  //     from: this.configService.get('SMTP_USER'),
  //     to: email,
  //     subject: 'Welcome to NestJS',
  //     text,
  //   });
  // }
}
