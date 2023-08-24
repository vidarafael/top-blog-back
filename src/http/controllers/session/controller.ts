import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { RegisterUserService } from "@/services/session/RegisterUserService";
import { SessionService } from "@/services/session/SessionService";

export class SessionController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      username: z.string(),
      password: z.string(),
      enterpriseId: z.string()
    })

    const { username, password, enterpriseId } = validateBodySchema.parse(request.body)

    const sessionService = new SessionService()
 
    const { user } = await sessionService.execute({ username, password, enterpriseId })
    
    const token = await reply.jwtSign({ 
      enterpriseId: user.enterpriseId,
    }, {
      sign: {
        sub: user.id
      }
    })

    reply.status(200).send({
      token
    })
  }


  async register(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      username: z.string(),
      password: z.string(),
      enterpriseId: z.string()
    })

    const { username, password, enterpriseId } = validateBodySchema.parse(request.body)

    const registerUserService = new RegisterUserService()
    const { user } = await registerUserService.execute({ username, password, enterpriseId })

    reply.status(201).send({ user })
  }

}