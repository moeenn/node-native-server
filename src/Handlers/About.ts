import { RouteHandler } from "@/Lib/Router"

export const About: RouteHandler = async (ctx) => {
  return ctx.json({
    message: "this is about",
  })
}
