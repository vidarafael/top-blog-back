import fastify from 'fastify'
import fastifyJWT from '@fastify/jwt'
import cors from '@fastify/cors'
import { enterprisesRoutes } from './http/controllers/enterprises/routes'
import { postsRoutes } from './http/controllers/posts/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { sessionsRoutes } from './http/controllers/session/routes'

const app = fastify()

app.register(cors, { 
  origin: '*'
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET
})

app.register(enterprisesRoutes, { prefix: '/enterprises' })
app.register(postsRoutes, { prefix: '/posts' })
app.register(sessionsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.', error })
})

export { app }