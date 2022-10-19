import "module-alias/register"
import { Server, Router, Logger } from "@/Lib/Server"
import { RoutesDefinition } from "./Routes"

async function main() {
	const definitions = new RoutesDefinition()
	const router = new Router(definitions)
	const logger = new Logger()

	const server = new Server(router, logger)
	await server.run(5000)
}

main().catch(console.error)