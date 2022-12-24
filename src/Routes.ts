import { IRoutesRegistry, IRoute } from "@/Lib/Router"
import { Service } from "@/Lib/DI"

import { Home } from "@/Handlers/Home"
import { About } from "@/Handlers/About"
import { Login } from "@/Handlers/Login"

/**
 *  register all routes here
 *
 */
@Service()
export class RoutesRegistry implements IRoutesRegistry {
  public readonly routes: IRoute[] = [
    { url: "/", method: "GET", options: Home },
    { url: "/about", method: "GET", options: About },
    { url: "/login", method: "POST", options: Login },
  ]
}
