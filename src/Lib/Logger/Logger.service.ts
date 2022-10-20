import { ILogger } from "./index.types"
import { Service } from "typedi"

@Service()
export class Logger implements ILogger {
  private stream = console.log

  /**
   *  format the log entry time in this format
   *
   */
  private getTime() {
    const time = new Date()
    return time.getTime()
  }

  /**
   *  log messages to the stdout
   *  promise is returned so the logging can be offloaded to the event-loop
   *
   */
  public log(message: string, details?: Record<string, unknown>): Promise<void> {
    return new Promise((resolve) => {

      const entry = {
        time: this.getTime(),
        message,
        ...(details && details),
      }

      const stringified = JSON.stringify(entry)
      this.stream(stringified)

      resolve()
    })
  }
}
