import "reflect-metadata"
import "module-alias/register"

import { Server } from "@/Lib/Server"
import { Container } from "@/Lib/DI"

async function main() {
  const server = Container.get(Server)
  await server.run(5000)
}

main().catch(console.error)
