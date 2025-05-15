// Inicialização do servidor
import { fastify } from 'fastify'

import { intentionRoutes } from "./routes/intentionRoutes"
import { leadRoutes } from "./routes/leadRoutes"
import { setupSwagger } from "./config/swagger"

const server = fastify({logger: true })

const start = async () => {
    try {
        await setupSwagger(server)
        await server.register(leadRoutes, intentionRoutes);
        await server.listen({ port: 3000 });
        
        console.log("o servidor foi iniciado com exito.")
        
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()




