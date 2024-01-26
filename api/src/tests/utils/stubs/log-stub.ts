import { ILog } from "../../../app/data/protocols/utils/log"

export class LogStub implements ILog {
  info(messages: string | string[]): void {
    return
  }
  
  error(messages: string | string[]): void { 
    return
  }
}
