export interface ILogger {
  log: (message: string, details?: Record<string, unknown>) => void
}
