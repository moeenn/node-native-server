import { IContext } from "@/Lib/Context"

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"

export interface IRouter {
  route: (method: HTTPMethod, url: string, handler: RouteHandler) => void
  resolve: (ctx: IContext) => void
}

export type RouteHandler = (ctx: IContext) => Promise<void>

export interface IRouteOptions {
  method: HTTPMethod
  url: string
  handler: RouteHandler
}

export interface IRoutesDefinition {
  routes: IRouteOptions[]
}
