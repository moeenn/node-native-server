import { IRouteOptions } from "@/Lib/Router"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const Login: IRouteOptions = {
  handler: async (ctx) => {
    const body = schema.parse(await ctx.body())

    return ctx.json({
      body,
    })
  }

}