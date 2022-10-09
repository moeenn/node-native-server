import { RouteHandler, IRouter, IRouteOptions, HTTPMethod } from "./index.types"
import { Context } from "./Context"
import { respond } from "./Helpers"

export class Router implements IRouter {
  private routesMap: Map<string, RouteHandler>

  /**
   *  construct router will multiple route definitions
   * 
  */
  constructor(routes: IRouteOptions[]) {
    this.routesMap = new Map()

    for (const route of routes) {
      this.route(route.method, route.url, route.handler)
    }
  }

  /**
   *  register individual route
   * 
  */
  public route(method: HTTPMethod, url: string, handler: RouteHandler) {
    const routeKey = `${method} ${url}`

    if (this.routesMap.has(routeKey)) {
      throw new Error(`route already registered: ${routeKey}`)
    }

    this.routesMap.set(routeKey, handler)
  }

  /**
   *  the server class will pass the context instance to this method
   *  then it will be up to the router to pass the request along to correct 
   *  request handler
   * 
  */
  public resolve(ctx: Context) {
    const { url, method } = ctx.request

    if (!url) {
      return respond(ctx, { message: "no url provided" }, 404)
    }

    const handler = this.routesMap.get(`${method} ${url}`)
    if (!handler) {
      return respond(ctx, { message: "not found" }, 404)
    }

    try {
      handler(ctx)
    } catch (err) {
      return respond(ctx, { error: (err as Error).message }, 500)
    }
  }
}