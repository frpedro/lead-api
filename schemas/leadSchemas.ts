export const createLeadSchema = {
  summary: 'Cadastrar um novo lead',
  tags: ['Lead'],
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' }
    }
  },
  response: {
    201: {
      description: 'Lead criado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    }
  }
}