import { prisma } from "@/prisma";

interface CreatePostServiceRequest {
  title: string;
  category: string;
  body: string;
  enterpriseId: string;
}


export class CreatePostService {
  async execute({ title, category, body, enterpriseId }: CreatePostServiceRequest) {
    const post = await prisma.posts.create({
      data: {
        title, 
        category, 
        body, 
        enterpriseId
      }
    })

    return { post }
  }
}