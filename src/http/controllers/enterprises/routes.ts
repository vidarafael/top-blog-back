import { FastifyInstance } from "fastify";
import { EnterpriseController } from "./controller";

const enterpriseController = new EnterpriseController()

export async function enterprisesRoutes(app: FastifyInstance) {
  app.post('/create', enterpriseController.create)
}