export interface INotificationService {
  sendMail(email: string, title: string, template: any): Promise<void>;
}
