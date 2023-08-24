import { prisma } from "@/prisma";

interface CreateEnterpriseServiceRequest {
  name: string;
}

export class CreateEnterpriseService {
  async execute({ name }: CreateEnterpriseServiceRequest) {
    const enterprise = await prisma.enterprises.create({
      data: {
        name
      }
    })

    return { enterprise }
  }
}