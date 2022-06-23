import { LoggerTypes } from "./contants";

export type LogDelegate = (
  type: LoggerTypes,
  message: string,
  data?: any
) => void;
