import { IsString } from "class-validator";

export class NotifyUserCreatedDTO {
  
  @IsString()
  email: string;

  @IsString()
  verificationCode: string;
}
