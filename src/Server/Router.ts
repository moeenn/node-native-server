import EventEmitter from "node:events"
import { RouteHandler, IRouter, IRouteOptions, HTTPMethod } from "./index.types"
import { Context } from "./Context"
import { respond } from "./Helpers"

export class Router implements IRouter {
  private routesSet: Set<string>
  private emitter: EventEmitter

  /**
   *  construct router will multiple route definitions
   * 
  */
  constructor(routes: IRouteOptions[]) {
    this.routesSet = new Set()
    this.emitter = new EventEmitter()

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

    if (this.routesSet.has(routeKey)) {
      throw new Error(`route already registered: ${routeKey}`)
    }

    /** @TODO: wrap the handler to do error handling */
    this.emitter.addListener(routeKey, handler)
    this.routesSet.add(routeKey)
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

    const exits = this.routesSet.has(`${method} ${url}`)
    if (!exits) {
      return respond(ctx, { message: "not found" }, 404)
    }

    const routeKey = `${method} ${url}`
    this.emitter.emit(routeKey, ctx)
  }
}