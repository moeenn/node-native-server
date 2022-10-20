import { IContext } from "@/Lib/Context"

/**
 *  send a direct response to the http client
 *
 */
function respond(ctx: IContext, data: unknown, status: number) {
  ctx.response
    .setHeader("Content-Type", "application/json")
    .writeHead(status)
    .end(JSON.stringify(data))
}

/**
 *  check if a string is a valid JSON or not
 * 
*/
function isJSON(str: string): boolean {
  try {
    return (JSON.parse(str) && !!str)
  } catch (e) {
    return false
  }
}

export const Helpers = {
  respond,
  isJSON,
}