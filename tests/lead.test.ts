import fastify from 'fastify'
import { leadRoutes } from '../routes/leadRoutes'

const app = fastify()
app.register(leadRoutes)

// Testa criação de lead via POST /lead
describe('POST /lead', () => {
  it('deve cadastrar um lead', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/lead',
      payload: {
        name: 'Pedro Teste',
        email: `pedro${Date.now()}@test.com` // Email único para evitar repetição
      }
    })

    expect(response.statusCode).toBe(201) 
    const body = JSON.parse(response.body)
    expect(body.name).toContain('Pedro') // Valida que o nome está no retorno
  })
})