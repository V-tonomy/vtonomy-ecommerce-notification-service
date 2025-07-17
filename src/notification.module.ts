import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NOTIFICATION_HANDLER } from './core';
import { NodemailerService } from './domain';
import { NotificationController } from './infras/notification.transport';

@Module({
  imports: [CqrsModule],
  controllers: [NotificationController],
  providers: [
    {
      provide: 'INotificationService',
      useClass: NodemailerService
    },
    ...NOTIFICATION_HANDLER],
})
export class NotificationModule {}
