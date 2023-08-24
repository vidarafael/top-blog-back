import { FastifyInstance } from "fastify";
import { SessionController } from "./controller";

const sessionController = new SessionController()

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', sessionController.login)
  app.post('/users/create', sessionController.register)
}