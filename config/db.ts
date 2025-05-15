// Arquivo de configuração do banco de dados

import { Pool } from 'pg';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config()

// Cria uma pool para conexões com o banco PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
