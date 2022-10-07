import {
  RequestListener, RouteHandler, Request,
  Response, IRouter, IRouteOptions, HTTPMethod
} from "./index.types"

import { Context } from "./Context"
import { respond } from "./Helpers"

export class Router implements IRouter {
  private routesMap: Map<string, RouteHandler>

  constructor(routes: IRouteOptions[]) {
    this.routesMap = new Map()

    for (const route of routes) {
      this.route(route.method, route.url, route.handler)
    }
  }

  public route(method: HTTPMethod, url: string, handler: RouteHandler) {
    const routeKey = `${method} ${url}`

    if (this.routesMap.has(routeKey)) {
      throw new Error(`route already registered: ${routeKey}`)
    }

    this.routesMap.set(routeKey, handler)
  }

  public hook(): RequestListener {
    const listener: RequestListener = (req: Request, res: Response) => {
      const { url, method } = req

      if (!url) {
        return respond(res, { message: "no url provided" }, 404)
      }

      const handler = this.routesMap.get(`${method} ${url}`)
      if (!handler) {
        return respond(res, { message: "not found" }, 404)
      }

      try {
        const ctx = new Context(req, res)
        handler(ctx)
      } catch (err) {
        return respond(res, { error: (err as Error).message }, 500)
      }
    }

    return listener
  }
}