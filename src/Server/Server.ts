import http from "http"
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