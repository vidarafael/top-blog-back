import { DeletePostService } from '@/services/posts/DeletePostService';
import { UpdatePostService } from '@/services/posts/UpdatePostService';
import { CreatePostService } from "@/services/posts/CreatePostService";
import { FindPostService } from "@/services/posts/FindPostService";
import { ListPostsService } from "@/services/posts/ListPostsService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'

export class PostController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const validateBodySchema = z.object({
      title: z.string(),
      category: z.string(),
      body: z.string(),
      enterpriseId: z.string()
    })

    const { title, category, body, enterpriseId } = validateBodySchema.parse(request.body)

    const createPostService = new CreatePostService()

    const { post } = await createPostService.execute({ title, category, body, enterpriseId })

    reply.status(201).send({ post })
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    const validateParamsSchema = z.object({
      id: z.string()
    })

    const { id } = validateParamsSchema.parse(request.params)

    const findPostService = new FindPostService()

    const { post } = await findPostService.execute({ id })

    reply.status(200).send({ post })
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const validateParamsSchema = z.object({
      id: z.string()
    })

    const { id } = validateParamsSchema.parse(request.params)

    const listsPostsService = new ListPostsService()

    const { posts } = await listsPostsService.execute({ id })

    reply.status(200).send({ posts })
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const validateParamsSchema = z.object({
      id: z.string()
    })

    const validateBodySchema = z.object({
      title: z.string(),
      category: z.string(),
      body: z.string(),
    })

    const { id } = validateParamsSchema.parse(request.params)
    const { body, category, title } = validateBodySchema.parse(request.body)

    const updatePostService = new UpdatePostService()

    const { post } = await updatePostService.execute({ id, body, category, title })

    reply.status(201).send({ post })
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const validateParamsSchema = z.object({
      id: z.string()
    })

    const { id } = validateParamsSchema.parse(request.params)

    const deletePostService = new DeletePostService()
    await deletePostService.execute({ id })

    reply.status(204).send()
  }
}