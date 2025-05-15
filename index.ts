import { fastify } from 'fastify'
import { intentionRoutes } from "./routes/intentionRoutes"
import { leadRoutes } from "./routes/leadRoutes"
import { setupSwagger } from "./config/swagger"

const server = fastify({logger: true })

// Inicialização do servidor
const start = async () => {
    try {
        await setupSwagger(server)
        await server.register(leadRoutes)
        await server.register(intentionRoutes)
        await server.listen({ port: 3000 })
        console.log("Servidor iniciado com êxito em http://localhost:3000")
    } 
    catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()




