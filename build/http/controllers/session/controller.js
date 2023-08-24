"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/session/controller.ts
var controller_exports = {};
__export(controller_exports, {
  SessionController: () => SessionController
});
module.exports = __toCommonJS(controller_exports);
var import_zod = require("zod");

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/session/RegisterUserService.ts
var import_argon2 = require("argon2");
var RegisterUserService = class {
  async execute({ username, password, enterpriseId }) {
    const password_hash = await (0, import_argon2.hash)(password);
    const user = await prisma.users.create({
      data: {
        username,
        password_hash,
        enterpriseId
      }
    });
    return { user };
  }
};

// src/services/session/SessionService.ts
var import_argon22 = require("argon2");
var SessionService = class {
  async execute({ username, password }) {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      throw new Error("Credentials errors.");
    }
    const checkPasswordMatch = await (0, import_argon22.verify)(user.password_hash, password);
    if (!checkPasswordMatch) {
      throw new Error("Credentials errors.");
    }
    return { user };
  }
};

// src/http/controllers/session/controller.ts
var SessionController = class {
  async login(request, reply) {
    const validateBodySchema = import_zod.z.object({
      username: import_zod.z.string(),
      password: import_zod.z.string(),
      enterpriseId: import_zod.z.string()
    });
    const { username, password, enterpriseId } = validateBodySchema.parse(request.body);
    const sessionService = new SessionService();
    const { user } = await sessionService.execute({ username, password, enterpriseId });
    const token = await reply.jwtSign({
      enterpriseId: user.enterpriseId
    }, {
      sign: {
        sub: user.id
      }
    });
    reply.status(200).send({
      token
    });
  }
  async register(request, reply) {
    const validateBodySchema = import_zod.z.object({
      username: import_zod.z.string(),
      password: import_zod.z.string(),
      enterpriseId: import_zod.z.string()
    });
    const { username, password, enterpriseId } = validateBodySchema.parse(request.body);
    const registerUserService = new RegisterUserService();
    const { user } = await registerUserService.execute({ username, password, enterpriseId });
    reply.status(201).send({ user });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SessionController
});
