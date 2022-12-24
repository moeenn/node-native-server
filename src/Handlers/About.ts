import { IRouteOptions } from "@/Lib/Router"

export const About: IRouteOptions = {
  handler: async (ctx) => {
    const token = ctx.getValue("token")

    /**
     *  TODO: remove ctx.json and should purely return data from this handler
    */
    return ctx.json({
      message: "this is about",
      token,
    })
  }
}
