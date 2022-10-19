import { RouteHandler } from "@/Lib/Server"

export const Login: RouteHandler = async (ctx) => {
  const body = await ctx.body()

  return ctx.json(
    {
      body
    }
  )
}