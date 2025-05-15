// Esquema de documentação e validação para cadastrar leads com dados pessoais
export const createLeadSchema = {
  summary: 'Cadastrar um novo lead',
  description: 'Cria um novo lead no sistema e envia um e-mail de boas-vindas automaticamente.',
  tags: ['Lead'],

  // Definição do corpo da requisição
  body: {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      name: {
        type: 'string',
        description: 'Nome completo do lead'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de e-mail do lead'
      }
    }
  },

  // Estrutura das respostas possíveis
  response: {
    201: {
      description: 'Lead criado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', format: "uuid", description: 'ID do lead' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    500: {
      description: 'Erro interno ao criar o lead',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Erro ao criar lead.' }
      }
    }
  }
}
