import { RequestListener, IncomingMessage, ServerResponse } from "node:http"

export {
  RequestListener,
  IncomingMessage as Request,
  ServerResponse as Response,
}

export interface ILogger {
  log: (message: string, details?: Record<string, unknown>) => void
}

export interface IServer {
  run: (port: number) => void
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"

export interface IRouter {
  route: (method: HTTPMethod, url: string, handler: RouteHandler) => void
  resolve: (ctx: IContext) => void
}

export interface IRouteOptions {
  method: HTTPMethod
  url: string
  handler: RouteHandler
}

export interface IRoutesDefinition {
  routes: IRouteOptions[]
}

export interface IContext {
  request: IncomingMessage
  response: ServerResponse
  body: () => Promise<unknown>
  json: (data: unknown, status?: number) => void
  setValue: (key: string, value: unknown) => void
  getValue: (key: string) => unknown
}

export type RouteHandler = (ctx: IContext) => Promise<void>
