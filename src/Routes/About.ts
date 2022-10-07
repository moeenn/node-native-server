import { RouteHandler } from "@/Server"

export const About: RouteHandler = (ctx) => {
  return ctx.json(
    {
      message: "this is about"
    }
  )
}
