import EventEmitter from "node:events"
import { RouteHandler, IRouter, HTTPMethod } from "./index.types"
import { RoutesRegistry } from "@/Routes"
import { IContext } from "@/Lib/Context"
import { Helpers } from "@/Lib/Server"
import { Exception } from "@/Lib/Exceptions"
import { Service } from "typedi"

@Service()
export class Router implements IRouter {
  private routesSet: Set<string>
  private emitter: EventEmitter

  /**
   *  construct router will multiple route definitions
   *
   */
  constructor(routesRegistry: RoutesRegistry) {
    this.routesSet = new Set()
    this.emitter = new EventEmitter()

    for (const route of routesRegistry.routes) {
      this.route(route.method, route.url, route.options.handler)
    }
  }

  /**
   *  register individual route
   *
   */
  public route(method: HTTPMethod, url: string, handler: RouteHandler) {
    const routeKey = `${method} ${url}`

    if (this.routesSet.has(routeKey)) {
      throw new Error(`route already registered: ${routeKey}`)
    }

    this.emitter.addListener(routeKey, this.decorateRouteHandler(handler))
    this.routesSet.add(routeKey)
  }

  /**
   *  wrap route handler to perform error handling
   *
   */
  private decorateRouteHandler(handler: RouteHandler): RouteHandler {
    return async (ctx: IContext) => {
      try {
        await handler(ctx)
      } catch (err) {

        if (err instanceof Exception) {
          return ctx.json(
            {
              status: err.status,
              message: err.message,
              details: err.details,
            },
            err.status,
          )
        }

        if (err instanceof Error) {
          const status = 500
          return ctx.json(
            {
              status,
              message: Helpers.isJSON(err.message)
                ? JSON.parse(err.message)
                : err.message,
            },
            status,
          )
        }

        return ctx.json({ error: err }, 500)
      }
    }
  }

  /**
   *  the server class will pass the context instance to this method
   *  then it will be up to the router to pass the request along to correct
   *  request handler
   *
   */
  public resolve(ctx: IContext) {
    const { url, method } = ctx.request

    if (!url) {
      return Helpers.respond(ctx, { message: "no url provided" }, 404)
    }

    const exits = this.routesSet.has(`${method} ${url}`)
    if (!exits) {
      return Helpers.respond(ctx, { message: "not found" }, 404)
    }

    const routeKey = `${method} ${url}`
    this.emitter.emit(routeKey, ctx)
  }
}
