import { FastifyRequest, FastifyReply } from 'fastify';
import { pool } from "../config/db";

interface Intention {
    zipcode_start: string;
    zipcode_end: string;
}

export async function createIntention (request: FastifyRequest<{ Body: Intention }>, reply: FastifyReply ) {
    const { zipcode_start, zipcode_end } = request.body;

    try {
        const result = await pool.query
        (
            'INSERT INTO intention (zipcode_start, zipcode_end) VALUES ($1, $2) RETURNING *',
            [zipcode_start, zipcode_end]
        )

        return reply.status(201).send(result.rows[0]);}

        catch (err) {
        console.error(err); 

        return reply.status(500).send({ error: 'Erro ao criar intenção de frete.' });

    }
}

export async function updateIntentionController( request: FastifyRequest<{ Params: { intention_id: string }; Body: { lead_id: string } }>, reply: FastifyReply ) {
    const { intention_id } = request.params;
    const { lead_id } = request.body;

    try {
        // Verifica se o lead existe
        const leadExists = await pool.query('SELECT id FROM lead WHERE id = $1', [lead_id]);
        if (leadExists.rowCount === 0) {
        return reply.status(404).send({ error: 'Lead não encontrado.' });
        }

        // Atualiza a intention associando ao lead
        await pool.query(
        'UPDATE intention SET lead_id = $1 WHERE id = $2',
        [lead_id, intention_id]
        );

        // Verifica se a intenção foi atualizada
        return reply.status(200).send({ message: 'Intenção atualizada com sucesso.' });
    }
    
        catch (error) { console.error(error); 
        return reply.status(500).send({ error: 'Erro interno no servidor.' });
        
    }

}