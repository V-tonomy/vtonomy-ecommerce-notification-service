import { Module } from '@nestjs/common';
import { NOTIFICATION_HANDLER } from './core';
import { NotificationController } from './infras/notification.transport';
import { NodemailerService } from './domain';
import { CoreModule } from 'vtonomy';

@Module({
  imports: [CoreModule],
  controllers: [NotificationController],
  providers: [
    {
      provide: 'INotificationService',
      useClass: NodemailerService
    },
    ...NOTIFICATION_HANDLER],
})
export class NotificationModule {}
