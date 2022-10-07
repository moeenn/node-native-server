import { RouteHandler } from "@/Server"

export const Login: RouteHandler = async (ctx) => {
  const body = await ctx.body()

  return ctx.json(
    {
      body
    }
  )
}