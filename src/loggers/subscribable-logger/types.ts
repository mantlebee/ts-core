import { LoggerTypes } from "../contants";

export type SubscribableLoggerData = {
  type: LoggerTypes;
  message: string;
  data?: any;
};
