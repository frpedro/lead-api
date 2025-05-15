import { FastifyInstance } from 'fastify';
import { createIntention, updateIntentionController } from '../controllers/intentionController';

export async function intentionRoutes(app: FastifyInstance) {
  app.post('/intention', createIntention);
  app.put('/intention/{intention_id}', updateIntentionController);
}
