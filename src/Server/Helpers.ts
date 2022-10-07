import { Response } from "./index.types"

export function respond(res: Response, data: unknown, status: number) {
  res
    .setHeader("Content-Type", "application/json")
    .writeHead(status)
    .end(
      JSON.stringify(data)
    )
}

export function uint8ArrayToJSON(chunks: Uint8Array[]): unknown {
  const data = Buffer.concat(chunks)
  return JSON.parse(data.toString())
}
