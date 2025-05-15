// Esquema de documentação e validação para registrar intenções de frete
export const createIntentionSchema = {
  summary: 'Cadastrar nova intenção de frete',
  description: 'Cria uma intenção de frete com os CEPs de origem e destino.',
  tags: ['Intention'],

  // Definição do corpo da requisição
  body: {
    type: 'object',
    required: ['zipcode_start', 'zipcode_end'],
    properties: {
      zipcode_start: {
        type: 'string',
        description: 'CEP de origem'
      },
      zipcode_end: {
        type: 'string',
        description: 'CEP de destino'
      }
    }
  },

  // Estrutura das respostas possíveis
  response: {
    201: {
      description: 'Intenção criada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', description: 'ID da intenção criada' },
        zipcode_start: { type: 'string' },
        zipcode_end: { type: 'string' }
      }
    },
    500: {
      description: 'Erro interno ao criar intenção',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Erro ao criar intenção de frete.' }
      }
    }
  }
}
