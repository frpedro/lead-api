import { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

export async function setupSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    swagger: {
      info: {
        title: 'Lead API',
        description: 'API para Gerenciamento de Leads',
        version: '1.0.0',
      },
    },
  })

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  })
}