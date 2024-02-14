export type ENotificationEnum = 'success' | 'info' | 'warning' | 'error';

export interface INotificationType {
  message: string;
  type: ENotificationEnum;
  description?: string;
}
