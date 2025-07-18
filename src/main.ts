import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QueueConfig } from 'vtonomy';
import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672',
      ],
      queue: 'notification_queue',
      queueOptions: QueueConfig,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3007);
}
bootstrap();
