import { Request, Response, IContext } from "./index.types"
import { respond, uint8ArrayToJSON } from "./Helpers"

export class Context implements IContext {
  public request: Request
  public response: Response

  constructor(req: Request, res: Response) {
    this.request = req
    this.response = res
  }

  public body(): Promise<unknown> {
    return new Promise((resolve) => {
      const chunks: Uint8Array[] = [];
      this.request.on("data", (chunk) => {
        chunks.push(chunk);
      })

      this.request.on("end", () => {
        const data = uint8ArrayToJSON(chunks)
        resolve(data)
      })
    })
  }

  public json(data: unknown, status = 200) {
    respond(this.response, data, status)
  }
}