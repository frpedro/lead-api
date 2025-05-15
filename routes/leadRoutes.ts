import { FastifyInstance } from 'fastify';
import { createLead } from '../controllers/leadController';
import { createLeadSchema } from "../schemas/leadSchemas";

export async function leadRoutes(app: FastifyInstance) {
  app.post('/lead', {
    schema: createLeadSchema,
    handler: createLead});
}