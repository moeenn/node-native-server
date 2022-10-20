import { IRouteOptions } from "@/Lib/Router"

export const About: IRouteOptions = {
  handler: async (ctx) => {
    const token = ctx.getValue("token")

    return ctx.json({
      message: "this is about",
      token,
    })
  }
}
