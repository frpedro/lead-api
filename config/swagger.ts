// Arquivo de configuração do Swagger para documentação e validação automática da API

import { FastifyInstance } from "fastify";
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'

// Registra os plugins Swagger e Swagger UI no servidor Fastify
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

  // Registra a interface do Swagger UI acessível via /docs
  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  })
}