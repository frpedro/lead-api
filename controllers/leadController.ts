// Controller para cadastrar leads com dados pessoais

import { FastifyRequest, FastifyReply } from 'fastify';
import { pool } from "../config/db";
import { mailer } from "../config/mailer";

// Define a estrutura esperada para o corpo da requisição
interface Lead {
  name: string;
  email: string;
}

export async function createLead(request: FastifyRequest<{ Body: Lead }>, reply: FastifyReply) {
  const { name, email } = request.body

  try {
     // Insere o novo lead no banco de dados e retorna o registro criado
    const result = await pool.query(
      'INSERT INTO lead (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    // Envia e-mail de agradecimento
    await mailer.sendMail({
      from: `"Lead API" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Obrigado pelo interesse!",
      text: `Olá ${name}, obrigado por se cadastrar em nossa plataforma.`,
    })

    // Retorna o lead criado com status 201
    return reply.status(201).send(result.rows[0])
    } 

    // Retorna erro 500 caso algo dê errado no servidor
    catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Erro ao criar lead.' })
  }
}
