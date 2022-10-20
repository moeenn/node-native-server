import { IRouteOptions } from "@/Lib/Router"

export const Home: IRouteOptions = {
  handler: async (ctx) => {
    throw new Error("sample error message")

    return ctx.json({
      message: "this is home",
    })
  }
}
