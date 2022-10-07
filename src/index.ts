import "module-alias/register"
import { Server, Router, Logger } from "./Server"
import { routes } from "./Routes"

async function main() {
	const router = new Router(routes)

	const server = new Server({
		router: router.hook(),
		logger: new Logger(),
	})

	await server.run(3000)
}

main().catch(console.error)