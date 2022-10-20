import { RequestListener, IncomingMessage, ServerResponse } from "node:http"

export {
  RequestListener,
  IncomingMessage as Request,
  ServerResponse as Response,
}

export interface IServer {
  run: (port: number) => void
}
