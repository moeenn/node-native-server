import "module-alias/register"
import { Server, Router, Logger } from "./Server"
import { routes } from "./Routes"

async function main() {
	const router = new Router(routes)
	const logger = new Logger()

	const server = new Server({ router, logger })
	await server.run(3000)
}

main().catch(console.error)