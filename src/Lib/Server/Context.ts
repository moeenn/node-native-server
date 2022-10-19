import { Request, Response, IContext } from "./index.types"
import { respond, uint8ArrayToJSON } from "./Helpers"

export class Context implements IContext {
  public request: Request
  public response: Response

  constructor(req: Request, res: Response) {
    this.request = req
    this.response = res
  }

  /**
   *  for POST/PUT requests, the body of the request can be parsed as object
   *  this method parses the request body on-demand
   * 
  */
  public body(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      this.request.on("data", (chunk) => {
        chunks.push(chunk);
      })

      this.request.on("end", () => {
        try {
          const data = uint8ArrayToJSON(chunks)
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
    respond(this, data, status)
  }
}