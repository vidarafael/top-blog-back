import { prisma } from "@/prisma"

interface UpdatePostServiceRequest {
  id: string;
  body: string;
  category: string;
  title: string;
}

export class UpdatePostService {
  async execute({ id, body, category, title }: UpdatePostServiceRequest) {
    const post = await prisma.posts.update({ where: { id }, data: {
      title,
      category,
      body
    } })


    return { post }
  }
}