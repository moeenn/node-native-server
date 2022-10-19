import { IRouteOptions, IRoutesDefinition } from "@/Lib/Server"
import { Service } from "@/Lib/DI"

import { Home } from "./Home"
import { About } from "./About"
import { Login } from "./Login"

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
