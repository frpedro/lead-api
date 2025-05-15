// Controller relacionado as intenções de frete
import { FastifyRequest, FastifyReply } from 'fastify';
import { pool } from "../config/db";

// Define a estrutura esperada para o corpo da requisição de criação de intenção
interface Intention {
  zipcode_start: string
  zipcode_end: string
}

// Função para registrar uma intenção de frete 
export async function createIntention(
  request: FastifyRequest<{ Body: Intention }>,
  reply: FastifyReply
) {
  const { zipcode_start, zipcode_end } = request.body

  // Insere nova intenção de frete no banco e retorna o registro criado
  try {
    const result = await pool.query(
      'INSERT INTO intention (zipcode_start, zipcode_end) VALUES ($1, $2) RETURNING *',
      [zipcode_start, zipcode_end]
    )
    return reply.status(201).send(result.rows[0]) // Retorna a intenção criada com status 201
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao criar intenção de frete.' })
  }
}

// Função que associa um lead a uma intenção de frete existente
export async function updateIntention(
  request: FastifyRequest<{ Params: { intention_id: string }; Body: { lead_id: string } }>,
  reply: FastifyReply
) {
  const { intention_id } = request.params
  const { lead_id } = request.body

  // Verifica se o lead informado existe no banco de dados
  try {
    const leadExists = await pool.query('SELECT id FROM lead WHERE id = $1', [lead_id])
    if (leadExists.rowCount === 0) {
      return reply.status(404).send({ error: 'Lead não encontrado.' }) // Retorna erro 404 se o lead não for encontrado
    }

    // Atualiza a intenção associando ao lead informado
    await pool.query(
      'UPDATE intention SET lead_id = $1 WHERE id = $2',
      [lead_id, intention_id]
    )

    return reply.status(200).send({ message: 'Intenção atualizada com sucesso.' }) // Retorna sucesso na atualização
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro interno no servidor.' })
  }
}
