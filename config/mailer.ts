// Arquivo de configuração para envio de email automático

import dotenv from "dotenv";
import nodemailer from "nodemailer";

// Carrega as variáveis de ambiente
dotenv.config()

// Configura o transportador do Nodemailer para envio de emails utilizando Gmail
export const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})