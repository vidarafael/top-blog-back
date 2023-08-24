import { prisma } from "@/prisma"

interface FindPostServiceRequest {
  id: string
}

export class FindPostService {
  async execute({ id }: FindPostServiceRequest) {
    const post = await prisma.posts.findUnique({ where: { id } })

    if (!post) {
      throw new Error('Post does not exists')
    }

    return { post }
  }
}