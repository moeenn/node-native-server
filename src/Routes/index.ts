import { IRouteOptions } from "@/Server"

import { Home } from "./Home"
import { About } from "./About"
import { Login } from "./Login"

export const routes: IRouteOptions[] = [
  { method: "GET", url: "/", handler: Home },
  { method: "GET", url: "/about", handler: About },
  { method: "POST", url: "/login", handler: Login },
]