import http from "node:http"
import { Context } from "./Context"
import { IServer, ILogger, IServerOptions, IRouter, Request, Response } from "./index.types"

export class Server implements IServer {
	private instance: http.Server
	private router: IRouter
	private logger?: ILogger

	constructor(options: IServerOptions) {
		this.instance = http.createServer(this.listener.bind(this))
		this.router = options.router

		if (options.logger) {
			this.logger = options.logger
		}
	}

	/**
	 *  all incoming requests will be routed through this function
	 *  the server will generate the context intance and pass it along to the 
	 *  router
	*/
	private listener(req: Request, res: Response) {
		const ctx = new Context(req, res)
		this.router.resolve(ctx)
	}

	/**
	 *  start execution of the server on the provided port
	 *  promise is returned so tests can wait for the server bootup to 
	 *  complete before performing the tests
	 * 
	*/
	run(port: number): Promise<void> {
		return new Promise((resolve) => {
			this.instance.listen(port, "localhost", () => {
				if (this.logger) {
					this.logger.log(`Starting server on port :${port}`)
				}

				resolve()
			})
		})
	}
}