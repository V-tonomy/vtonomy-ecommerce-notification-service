import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import { INotificationService } from 'src/domain';
import { NotifyUserCreatedCommand } from '../command/notify-user-created.cmd';

@CommandHandler(NotifyUserCreatedCommand)
export class NotifyUserCreatedHandler
  implements ICommandHandler<NotifyUserCreatedCommand>
{
  constructor(
    @Inject('INotificationService')
    private readonly notificationService: INotificationService,
  ) {}

  async execute(command: NotifyUserCreatedCommand): Promise<string> {
    const { email, verificationCode } = command.props;

    const filePath = path.join(
      process.cwd(),
      'src',
      'domain',
      'template',
      'welcome.hbs',
    );
    const source = fs.readFileSync(filePath, 'utf8');
    const htmlTemplate = handlebars.compile(source);
    const baseUrl =
      process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000/auth/verifyCode';
    const html = htmlTemplate({
      verifyLink: `${baseUrl}?code=${verificationCode}`,
    });

    await this.notificationService.sendMail(
      email,
      'Verify your email address',
      html,
    );

    return 'Verification email sent';
  }
}
