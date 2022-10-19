import { RouteHandler } from "@/Lib/Server"

export const Home: RouteHandler = async (ctx) => {
  throw new Error("sample error message")

  return ctx.json({
    message: "this is home",
  })
}
