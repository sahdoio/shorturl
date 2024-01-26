import env from "../../../env";
import { ILog } from "../../data/protocols/utils/log";

export class Log implements ILog {
  error(messages: string | string[]): void {
    messages = Array.isArray(messages) ? messages : [messages]
    if (env.ENV !== 'test') {
      console.error(...messages)
    }
  }
} 