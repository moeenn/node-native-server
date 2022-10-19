import { IContext } from "./index.types"

/**
 *  send a direct response to the http client
 *
 */
export function respond(ctx: IContext, data: unknown, status: number) {
  ctx.response
    .setHeader("Content-Type", "application/json")
    .writeHead(status)
    .end(JSON.stringify(data))
}

/**
 *  for POST/PUT requests, the request body is received as Uint8Array chunks
 *  this method converts these chunks to JSON
 */
export function uint8ArrayToJSON(chunks: Uint8Array[]): unknown {
  const data = Buffer.concat(chunks)
  return JSON.parse(data.toString())
}
