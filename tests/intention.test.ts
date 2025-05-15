import fastify from 'fastify'
import { intentionRoutes } from '../routes/intentionRoutes'

const app = fastify()
app.register(intentionRoutes)

// Testa criação de intenção via POST /intention
describe('POST /intention', () => {
  it('deve criar intenção', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/intention',
      payload: { zipcode_start: '12345', zipcode_end: '54321' }
    })

    expect(response.statusCode).toBe(201)
  })
})

// Testa atualização de intenção via PUT /intention/:id
describe('PUT /intention/:intentionId', () => {
  it('deve atualizar uma intenção', async () => {
    // Primeiro cria a intenção para obter o ID válido
    const create = await app.inject({
      method: 'POST',
      url: '/intention',
      payload: { zipcode_start: '12345', zipcode_end: '54321' }
    })

    const created = JSON.parse(create.body)
    const intentionId = created.id || created.intention_id

    // Agora faz o update usando o payload com lead_id
    const response = await app.inject({
      method: 'PUT',
      url: `/intention/${intentionId}`,
      payload: { lead_id: 'b554a96c-dd0d-4bdf-9470-076435cf9418' }  
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)

  })
})
