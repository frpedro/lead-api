
# Lead API

API para gerenciamento de leads e intenções de frete, construída com **Node.js**, **TypeScript**, **Fastify**, **PostgreSQL**, **Nodemailer** e documentada com **Swagger**.

----------

## Tecnologias usadas

-   Node.js
    
-   TypeScript
    
-   Fastify
    
-   PostgreSQL
    
-   Nodemailer (envio de emails)
    
-   Swagger (documentação automática)
    
-   Jest (testes)
    
-   Dotenv (variáveis de ambiente)
    

----------

## Funcionalidades

-   Cadastro de leads (nome e e-mail) com envio automático de e-mail de agradecimento.
    
-   Cadastro e atualização de intenções de frete vinculadas a leads.
    
-   Validação das entradas de dados em todas as rotas.
    
-   Documentação automática da API acessível via Swagger UI.
    
-   Testes unitários cobrindo 86% do código.
    

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

-   Node.js (versão 18+ recomendada)
    
-   PostgreSQL rodando e configurado
    
-   Conta de e-mail para envio (configurada no `.env`)
    

### Passos

1.  Clone o repositório
    

````bash

git clone https://github.com/frpedro/lead-api.git cd lead-api 

````
2.  Instale as dependências
    

````bash
npm install 
````

3.  Configure as variáveis de ambiente (`.env`)  
4. 
    Baseie-se no `.env.example`, informando dados do banco, e-mail e outras configs.  
    
    Exemplo mínimo:
    
	````ini
	
	DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
	MAIL_USER=seu-email@example.com MAIL_PASS=sua-senha
	
	````

4.  Crie as tabelas no banco (veja a seção [Como criar as tabelas](#como-criar-as-tabelas) abaixo)

5.  Inicie o servidor:
   
	`ts-node index.ts` 

6.  Acesse a documentação Swagger em:
   
	````bash
	http://localhost:3000/docs 
	````
----------

## Como criar as tabelas

O projeto não usa migrations nem ORM: as tabelas devem ser criadas manualmente no banco PostgreSQL apontado por `DATABASE_URL`, antes de iniciar o servidor.

Conecte-se ao banco (ex.: `psql $DATABASE_URL`) e execute os comandos na ordem abaixo:

1.  Habilite a extensão usada para gerar os IDs em UUID:

	````sql
	CREATE EXTENSION IF NOT EXISTS "pgcrypto";
	````

2.  Crie a tabela `lead`:

	````sql
	CREATE TABLE lead (
	  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	  name VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL
	);
	````

3.  Crie a tabela `intention` (depende de `lead` já existir, por causa da foreign key `lead_id`):

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

-   Para rodar todos os testes:
	````bash
	npm test 
-   Para gerar relatório de cobertura:
	````bash
	npm run coverage 
	````
A cobertura atual está em 86%.

----------

## Endpoints principais

| Método | Rota             | Descrição                        |
|--------|------------------|---------------------------------|
| POST   | /lead            | Cadastrar novo lead             |
| POST   | /intention       | Criar intenção de frete         |
| PUT    | /intention/:id   | Atualizar intenção vinculando lead |
| GET    | /docs            | Documentação Swagger UI         |
----------

## Observações finais

-   Código organizado seguindo boas práticas e princípios de clean code.
    
-   Documentação automática com schemas JSON e Fastify Swagger plugin.
    
-   Envio automático de e-mail de agradecimento após cadastro de lead.
    
-   Testes cobrindo principais fluxos da aplicação.
