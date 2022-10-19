import { IRouteOptions } from "@/Lib/Server"

export class RoutesDefinition {
  public readonly routes: IRouteOptions[]

  constructor(routes: IRouteOptions[]) {
    this.routes = routes
  }
}