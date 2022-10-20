import { RouteHandler } from "@/Lib/Router"

export const About: RouteHandler = async (ctx) => {
  const token = ctx.getValue("token")

  return ctx.json({
    message: "this is about",
    token,
  })
}
