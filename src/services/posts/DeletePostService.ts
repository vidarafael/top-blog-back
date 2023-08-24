import { prisma } from "@/prisma"

interface DeletePostServiceRequest {
  id: string
}

export class DeletePostService {
  async execute({ id }: DeletePostServiceRequest) {
    await prisma.posts.delete({ where: { id } })
  }
}