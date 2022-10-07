import { RequestListener, IncomingMessage, ServerResponse } from "node:http"

export {
  RequestListener,
  IncomingMessage as Request,
  ServerResponse as Response,
}

export interface ILogger {
  log: (message: string, details?: unknown) => void
}

export interface IServerOptions {
  router: RequestListener,
  logger?: ILogger,
}

export interface IServer {
  run: (port: number) => void
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"

export interface IRouter {
  route: (method: HTTPMethod, url: string, handler: RouteHandler) => void,
  hook: (req: Request, res: Response) => void
}

export interface IRouteOptions {
  method: HTTPMethod,
  url: string,
  handler: RouteHandler,
}

export interface IContext {
  request: IncomingMessage,
  response: ServerResponse,
  body: () => Promise<unknown>,
  json: (data: unknown, status?: number) => void,
}

export type RouteHandler = (ctx: IContext) => void