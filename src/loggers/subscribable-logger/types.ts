import { LogTypes } from "../contants";

export type SubscribableLoggerData = {
  type: LogTypes;
  message: string;
  data?: any;
};
