import { prisma } from "@/prisma"


interface ListPostsRequest {
  id: string
}

export class ListPostsService {

  async execute({ id }: ListPostsRequest) {
    const posts = await prisma.posts.findMany({ 
      where: { 
        enterpriseId: id 
      }, 
      select: { 
        id: true, 
        title: true, 
        body: true, 
        category: true,  
        created_at: true 
      } 
    })

    return { posts }
  }
}