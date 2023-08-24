import { FastifyInstance } from "fastify";
import { PostController } from "./controller";
import { verifyJWT } from "@/middlewares/verifyJwt";

const postController = new PostController()

export async function postsRoutes(app: FastifyInstance) {
  app.post('/create', { onRequest: [verifyJWT] }, postController.create)
  app.get('/enterprises/:id', postController.list)
  app.get('/:id', postController.find)
  app.put('/:id', { onRequest: [verifyJWT] }, postController.update)
  app.delete('/:id', { onRequest: [verifyJWT] }, postController.delete)
}