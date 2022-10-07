import http from "node:http"
import { IServer, ILogger, IServerOptions } from "./index.types"

export class Server implements IServer {
	private instance: http.Server
	private logger?: ILogger

	constructor(options: IServerOptions) {
		this.instance = http.createServer(options.router)

		if (options.logger) {
			this.logger = options.logger
		}
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