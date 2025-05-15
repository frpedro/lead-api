// Esquema de documentação e validação para associar um lead a uma intenção de frete existente
export const updateIntentionSchema = {
  summary: 'Atualizar intenção com lead',
  description: 'Associa uma intenção de frete existente a um lead.',
  tags: ['Intention'],

  // Validação dos parâmetros da rota
  params: {
    type: 'object',
    required: ['intention_id'],
    properties: {
      intention_id: {
        type: 'string',
        description: 'ID da intenção a ser atualizada'
      }
    }
  },

  // Validação do corpo da requisição
  body: {
    type: 'object',
    required: ['lead_id'],
    properties: {
      lead_id: {
        type: 'string',
        description: 'ID do lead a ser associado'
      }
    }
  },

  // Estrutura das respostas possíveis
  response: {
    200: {
      description: 'Intenção atualizada com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Intenção atualizada com sucesso.' }
      }
    },
    404: {
      description: 'Lead não encontrado',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Lead não encontrado.' }
      }
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Erro interno no servidor.' }
      }
    }
  }
}