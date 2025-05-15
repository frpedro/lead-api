import { FastifyInstance } from 'fastify';
import { createLead } from '../controllers/leadController';
import { createLeadSchema } from "../schemas/createLeadSchema";

// Registra as rotas relacionadas aos leads
export async function leadRoutes(app: FastifyInstance) {
  app.post('/lead', {
    schema: createLeadSchema, // Validação e documentação
    handler: createLead}) // Função que processa a criação do lead
} 