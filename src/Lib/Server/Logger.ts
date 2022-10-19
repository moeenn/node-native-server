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
    return {
      timestamp: time.getTime(),
      time: `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`,
    }
  }

  /**
   *  log messages to the stdout
   *  promise is returned so the logging can be offloaded to the event-loop
   *
   */
  public log(message: string, details: unknown = undefined): Promise<void> {
    return new Promise((resolve) => {
      const { time, timestamp } = this.getTime()

      const entry = {
        timestamp,
        time,
        message,
        details: details,
      }

      const stringified = JSON.stringify(entry) + ","
      this.stream(stringified)

      resolve()
    })
  }
}
