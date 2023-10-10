import { LogTypes } from "./contants";

export type LogDelegate = (type: LogTypes, message: string, data?: any) => void;
