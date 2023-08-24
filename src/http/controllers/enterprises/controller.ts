import { CreateEnterpriseService } from "@/services/enterprises/CreateEnterpriseService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'

export class EnterpriseController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      name: z.string(),
    })

    const { name } = validateBodySchema.parse(request.body)

    const createEnterpriseService = new CreateEnterpriseService()
    const { enterprise } = await createEnterpriseService.execute({ name })

    reply.status(201).send({ enterprise })
  }

}