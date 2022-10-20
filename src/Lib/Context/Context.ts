import { IncomingMessage, ServerResponse, IContext } from "./index.types"
import { Helpers } from "@/Lib/Server"

export class Context implements IContext {
  public request: IncomingMessage
  public response: ServerResponse
  private _store: Map<string, unknown>

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.request = req
    this.response = res
    this._store = new Map()
  }

  /**
   *  for POST/PUT requests, the request body is received as Uint8Array chunks
   *  this method converts these chunks to JSON
   */
  private _uint8ArrayToJSON(chunks: Uint8Array[]): unknown {
    const data = Buffer.concat(chunks)
    return JSON.parse(data.toString())
  }

  /**
   *  for POST/PUT requests, the body of the request can be parsed as object
   *  this method parses the request body on-demand
   *
   */
  public body(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = []
      this.request.on("data", (chunk) => {
        chunks.push(chunk)
      })

      this.request.on("end", () => {
        try {
          const data = this._uint8ArrayToJSON(chunks)
          resolve(data)
        } catch (err) {
          reject(err)
        }
      })
    })
  }

  /**
   *  helper for sending direct response to the http client as JSON
   *
   */
  public json(data: unknown, status = 200) {
    Helpers.respond(this, data, status)
  }

  /**
   *  store a value on the current request 
   * 
  */
  public setValue(key: string, value: unknown) {
    this._store.set(key, value)
  }

  /**
   *  retreive a value from the request storage
   * 
  */
  public getValue(key: string): unknown {
    const value = this._store.get(key)
    if (!value) {
      throw new Error(`'${key}' not set on the context`)
    }

    return value
  }
}
