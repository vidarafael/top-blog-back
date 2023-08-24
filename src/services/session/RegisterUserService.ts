import { prisma } from "@/prisma";
import { hash } from "argon2";

interface RegisterUserServiceRequest {
  username: string;
  password: string;
  enterpriseId: string;
}


export class RegisterUserService {
  async execute({ username, password, enterpriseId }: RegisterUserServiceRequest) {
    const password_hash = await hash(password)

    const user = await prisma.users.create({
      data: {
        username, 
        password_hash, 
        enterpriseId
      }
    })

    return { user }
  }
}