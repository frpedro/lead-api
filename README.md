# Lead API

API para gerenciamento de leads e intenções de frete, construída com **Node.js**, **TypeScript**, **Fastify**, **PostgreSQL**, **Nodemailer** e documentada com **Swagger**.

----------

## Tecnologias usadas

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Nodemailer (envio de e-mails)
- Swagger (documentação automática)
- Jest (testes)
- Dotenv (variáveis de ambiente)

----------

## Funcionalidades

- Cadastro de leads (nome e e-mail) com envio automático de e-mail de agradecimento.
- Cadastro e atualização de intenções de frete vinculadas a leads.
- Validação das entradas de dados em todas as rotas.
- Documentação automática da API acessível via Swagger UI.
- Testes unitários cobrindo 86% do código.

----------

## Estrutura do projeto

````bash
├── config/ # Configurações do servidor, banco e mailer
├── controllers/ # Funções de lógica de negócio das rotas
├── routes/ # Definição das rotas da API
├── schemas/ # Schemas para validação e documentação Swagger
├── tests/ # Testes unitários com Jest
├── coverage/ # Relatório de cobertura dos testes
├── index.ts # Entrada principal do servidor
├── jest.config.ts # Configuração do Jest
├── tsconfig.json # Configuração do TypeScript
├── package.json # Dependências e scripts
└── .env.example # Exemplo das variáveis de ambiente necessárias
````

----------

## Como rodar o projeto

### Pré-requisitos

- Node.js (versão 18 ou mais recente)
- PostgreSQL instalado e rodando
- Conta de e-mail para envio (configurada no `.env`)

### Passos

1. Clone o repositório:

````bash
git clone https://github.com/frpedro/lead-api.git
cd lead-api
````

2. Instale as dependências:

````bash
npm install
````

3. Crie um banco de dados vazio (troque `nome_do_banco` pelo nome que preferir):

````bash
createdb nome_do_banco
````

Se o comando `createdb` não existir na sua máquina, entre no `psql` e rode `CREATE DATABASE nome_do_banco;`.

4. Crie o arquivo `.env` a partir do exemplo (`cp .env.example .env`) e preencha com os dados do seu banco e do seu e-mail. Exemplo mínimo:

````ini
DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
MAIL_USER=seu-email@example.com
MAIL_PASS=sua-senha
````

Confira no `.env.example` se há outras variáveis a preencher.

5. Crie as tabelas no banco (veja a seção [Como criar as tabelas](#como-criar-as-tabelas) abaixo).

6. Inicie o servidor:

````bash
npx ts-node index.ts
````

7. Acesse a documentação Swagger em:

````
http://localhost:3000/docs
````

Na própria documentação você pode testar as rotas clicando em **Try it out**.

----------

## Como criar as tabelas

O projeto não usa migrations nem ORM: as tabelas devem ser criadas manualmente no banco PostgreSQL apontado por `DATABASE_URL`, antes de iniciar o servidor.

Conecte-se ao banco (ex.: `psql $DATABASE_URL`) e execute os comandos na ordem abaixo:

1. Habilite a extensão usada para gerar os IDs em UUID:

````sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
````

2. Crie a tabela `lead`:

````sql
CREATE TABLE lead (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
````

3. Crie a tabela `intention` (depende de `lead` já existir, por causa da foreign key `lead_id`):

````sql
CREATE TABLE intention (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zipcode_start VARCHAR(20) NOT NULL,
  zipcode_end VARCHAR(20) NOT NULL,
  lead_id UUID REFERENCES lead(id)
);
````

----------

## Testes

Para rodar todos os testes:

````bash
npm test
````

Para gerar o relatório de cobertura:

````bash
npm run coverage
````

A cobertura atual está em 86%.

----------

## Endpoints principais

| Método | Rota           | Descrição                          |
|--------|----------------|------------------------------------|
| POST   | /lead          | Cadastrar novo lead                |
| POST   | /intention     | Criar intenção de frete            |
| PUT    | /intention/:id | Atualizar intenção vinculando lead |
| GET    | /docs          | Documentação Swagger UI            |

----------

## Observações finais

- Documentação automática com schemas JSON e o plugin Fastify Swagger.
- Envio automático de e-mail de agradecimento após o cadastro de um lead.
- Testes cobrindo os principais fluxos da aplicação.