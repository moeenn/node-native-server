import { RouteHandler } from "@/Server"

export const Home: RouteHandler = (ctx) => {
  return ctx.json(
    {
      message: "this is home"
    }
  )
}
