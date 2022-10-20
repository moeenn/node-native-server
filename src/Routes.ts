import { IRouteOptions, IRoutesDefinition } from "@/Lib/Router"
import { Service } from "@/Lib/DI"

import { Home } from "@/Handlers/Home"
import { About } from "@/Handlers/About"
import { Login } from "@/Handlers/Login"

/**
 *  register all routes here
 *
 */
@Service()
export class RoutesDefinition implements IRoutesDefinition {
  public readonly routes: IRouteOptions[] = [
    { url: "/", method: "GET", handler: Home },
    { url: "/about", method: "GET", handler: About },
    { url: "/login", method: "POST", handler: Login },
  ]
}
