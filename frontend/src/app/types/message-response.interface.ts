import { IMessage } from './message.interface';

export interface IMessageResponse {
  status: string;
  messages: IMessage[];
  count: number;
}
