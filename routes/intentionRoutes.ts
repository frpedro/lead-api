import { FastifyInstance } from 'fastify';
import { createIntention, updateIntention } from '../controllers/intentionController';
import { createIntentionSchema } from '../schemas/createIntentionSchema';
import { updateIntentionSchema } from '../schemas/updateIntentionSchema';

// Registra as rotas relacionadas as intenções de frete
export async function intentionRoutes(app: FastifyInstance) {
  app.post('/intention', {
    schema: createIntentionSchema, // Validação e documentação
    handler: createIntention // Função que cria uma intenção de frete
  })

  app.put('/intention/{intention_id}', {
    schema: updateIntentionSchema, // Validação e documentação
    handler: updateIntention}) // Função que atualiza uma intenção de frete com lead existente
} 

