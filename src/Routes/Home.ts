import { RouteHandler } from "@/Lib/Server"

export const Home: RouteHandler = async (ctx) => {
  return ctx.json(
    {
      message: "this is home"
    }
  )
}
