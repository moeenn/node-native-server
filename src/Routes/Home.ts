import { RouteHandler } from "@/Lib/Server"

export const Home: RouteHandler = async (ctx) => {
  throw "hello world"

  return ctx.json({
    message: "this is home",
  })
}
