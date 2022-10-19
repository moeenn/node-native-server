import { RouteHandler } from "@/Lib/Server"

export const About: RouteHandler = async (ctx) => {
  return ctx.json({
    message: "this is about",
  })
}
