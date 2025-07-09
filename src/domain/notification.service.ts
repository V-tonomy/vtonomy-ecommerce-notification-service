import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { INotificationService } from './notification.interface';

@Injectable()
export class NodemailerService implements INotificationService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ?? "smtp.gmail.com",
    port: process.env.MAIL_PORT ?? 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER ?? "vtonomy@gmail.com",
      pass: process.env.MAIL_PASS ?? "piuersnwrdoujfwe",
    },
  });

  async sendMail(email: string, title: string, template: any): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.MAIL_HOST,
      to: email,
      subject: title,
      html: template,
    });
  }
}
