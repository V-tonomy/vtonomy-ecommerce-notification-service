import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotifyUserCreatedCommand } from 'src/core';
import { NotifyUserCreatedDTO } from 'src/core/dto/notification.dto';
import { ResponseDTO, User_Created } from 'vtonomy';

@Controller('notification')
export class NotificationController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @MessagePattern(User_Created)
  public async handlerUserCreated(
    @Payload() data: NotifyUserCreatedDTO,
    @Ctx() context: RmqContext,
  ) {
    try {
      const res = await this.commandBus.execute(NotifyUserCreatedCommand.create(data));
      return new ResponseDTO(res);
    } catch (error) {
      console.log("🚀 ~ NotificationController ~ error:", error)
      return { success: false, error: error?.errorResponse?.errmsg || 'Error' };
    }
  }
}
