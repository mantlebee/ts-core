import { ISubscribable, Subscribable, Subscription } from "@/subscriptions";

import { LoggerTypes } from "../contants";
import { ILogger } from "../interfaces";
import { Logger } from "../models";
import { SubscribableLoggerData } from "./types";

export class SubscribableLogger extends Logger implements ILogger, ISubscribable<SubscribableLoggerData> {
    private _subscribable = new Subscribable<SubscribableLoggerData>()

    public override log(type: LoggerTypes, message: string, data?: any): void {
        this._subscribable.notifyData({type, message, data })
    }
    public subscribe(subscription: Subscription<SubscribableLoggerData>): number {
        return this._subscribable.subscribe(subscription)
    }
    public unsubscribe(id: number): void {
        this._subscribable.unsubscribe(id)
    }
}