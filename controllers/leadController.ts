import { FastifyRequest, FastifyReply } from 'fastify';
import { pool } from "../config/db";
import { request } from 'http';
import { mailer } from "../config/mailer";

interface Lead {
    name: string;
    email: string;
}

export async function createLead (request: FastifyRequest<{ Body: Lead }>, reply: FastifyReply ) {

    const { name, email } = request.body;

    try {
        const result = await pool.query
        (
            'INSERT INTO lead (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        )

         // Envia e-mail de agradecimento
        await mailer.sendMail({
            from: `"Lead API" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Obrigado pelo interesse!",
            text: `Olá ${name}, obrigado por se cadastrar em nossa plataforma.`,
        });

        return reply.status(201).send(result.rows[0]);
    } 

    catch (err) {
        console.error(err);
        return reply.status(500).send({ error: 'Erro ao criar lead.' });
    }
}
