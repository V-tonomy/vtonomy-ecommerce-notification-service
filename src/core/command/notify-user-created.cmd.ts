import { ICommand } from '@nestjs/cqrs';
import { NotifyUserCreatedDTO } from '../dto/notification.dto';

export class NotifyUserCreatedCommand implements ICommand {
  public props: NotifyUserCreatedDTO;

  constructor(props: NotifyUserCreatedDTO) {
    this.props = props;
  }

  static create(props: NotifyUserCreatedDTO) {
    return new NotifyUserCreatedCommand(props);
  }
}
