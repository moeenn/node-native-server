import { IncomingMessage, ServerResponse } from "node:http"

export { IncomingMessage, ServerResponse }

export interface IContext {
  request: IncomingMessage
  response: ServerResponse
  body: () => Promise<unknown>
  json: (data: unknown, status?: number) => void
  setValue: (key: string, value: unknown) => void
  getValue: (key: string) => unknown
}