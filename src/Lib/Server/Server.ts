import http from "node:http"
import { Context } from "./Context"
import { IServer, Request, Response } from "./index.types"
import { Router } from "./Router"
import { Logger } from "./Logger"
import { Service } from "typedi"

@Service()
export class Server implements IServer {
  private instance: http.Server

  constructor(public router: Router, public logger: Logger) {
    this.instance = http.createServer(this.listener.bind(this))
  }

  /**
   *  all incoming requests will be routed through this function
   *  the server will generate the context intance and pass it along to the
   *  router
   */
  private listener(req: Request, res: Response) {
    const ctx = new Context(req, res)
    this.router.resolve(ctx)

    /** @TODO: perform after request is completed */
    this.logger.log(`${req.method} - ${req.url}`)
  }

  /**
   *  start execution of the server on the provided port
   *  promise is returned so tests can wait for the server bootup to
   *  complete before performing the tests
   *
   */
  run(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.instance.listen(port, "0.0.0.0", () => {
        this.logger.log(`Starting server on port :${port}`)
        resolve()
      })
    })
  }
}
