import { IContext } from "@/Lib/Context"

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"

export interface IRouter {
  route: (method: HTTPMethod, url: string, handler: RouteHandler) => void
  resolve: (ctx: IContext) => void
}

export type RouteHandler = (ctx: IContext) => Promise<void>

// TODO: add preHandler
export interface IRouteOptions {
  handler: RouteHandler
}

export interface IRoute {
  method: HTTPMethod
  url: string
  options: IRouteOptions
}

export interface IRoutesDefinition {
  routes: IRoute[]
}
