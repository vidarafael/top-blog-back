import { prisma } from "@/prisma";
import { verify } from "argon2";

interface SessionServiceRequest {
  username: string;
  password: string;
  enterpriseId: string;
}


export class SessionService {
  async execute({ username, password }: SessionServiceRequest) {
    const user = await prisma.users.findUnique({ where: { username } })

    if (!user) {
      throw new Error("Credentials errors.")
    }

    const checkPasswordMatch = await verify(user.password_hash, password)

    if (!checkPasswordMatch) {
      throw new Error("Credentials errors.")
    }

    return { user }
  }
}