import { ILogger } from "./index.types"

export class Logger implements ILogger {
  private stream = console.log

  private getTime(): string {
    const time = new Date()
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
  }

  /**
   *  log messages to the stdout
  */
  public log(message: string, details: unknown = undefined): Promise<void> {
    return new Promise(resolve => {
      const time = this.getTime()
      const output = `${time} - ${message}`

      if (details) {
        this.stream(output, details)
        return
      }

      this.stream(output)
      resolve()
    })
  }
}