"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_cors = __toESM(require("@fastify/cors"));

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/enterprises/CreateEnterpriseService.ts
var CreateEnterpriseService = class {
  async execute({ name }) {
    const enterprise = await prisma.enterprises.create({
      data: {
        name
      }
    });
    return { enterprise };
  }
};

// src/http/controllers/enterprises/controller.ts
var import_zod = require("zod");
var EnterpriseController = class {
  async create(request, reply) {
    const validateBodySchema = import_zod.z.object({
      name: import_zod.z.string()
    });
    const { name } = validateBodySchema.parse(request.body);
    const createEnterpriseService = new CreateEnterpriseService();
    const { enterprise } = await createEnterpriseService.execute({ name });
    reply.status(201).send({ enterprise });
  }
};

// src/http/controllers/enterprises/routes.ts
var enterpriseController = new EnterpriseController();
async function enterprisesRoutes(app2) {
  app2.post("/create", enterpriseController.create);
}

// src/services/posts/DeletePostService.ts
var DeletePostService = class {
  async execute({ id }) {
    await prisma.posts.delete({ where: { id } });
  }
};

// src/services/posts/UpdatePostService.ts
var UpdatePostService = class {
  async execute({ id, body, category, title }) {
    const post = await prisma.posts.update({ where: { id }, data: {
      title,
      category,
      body
    } });
    return { post };
  }
};

// src/services/posts/CreatePostService.ts
var CreatePostService = class {
  async execute({ title, category, body, enterpriseId }) {
    const post = await prisma.posts.create({
      data: {
        title,
        category,
        body,
        enterpriseId
      }
    });
    return { post };
  }
};

// src/services/posts/FindPostService.ts
var FindPostService = class {
  async execute({ id }) {
    const post = await prisma.posts.findUnique({ where: { id } });
    if (!post) {
      throw new Error("Post does not exists");
    }
    return { post };
  }
};

// src/services/posts/ListPostsService.ts
var ListPostsService = class {
  async execute({ id }) {
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
    });
    return { posts };
  }
};

// src/http/controllers/posts/controller.ts
var import_zod2 = require("zod");
var PostController = class {
  async create(request, reply) {
    const validateBodySchema = import_zod2.z.object({
      title: import_zod2.z.string(),
      category: import_zod2.z.string(),
      body: import_zod2.z.string(),
      enterpriseId: import_zod2.z.string()
    });
    const { title, category, body, enterpriseId } = validateBodySchema.parse(request.body);
    const createPostService = new CreatePostService();
    const { post } = await createPostService.execute({ title, category, body, enterpriseId });
    reply.status(201).send({ post });
  }
  async find(request, reply) {
    const validateParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const findPostService = new FindPostService();
    const { post } = await findPostService.execute({ id });
    reply.status(200).send({ post });
  }
  async list(request, reply) {
    const validateParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const listsPostsService = new ListPostsService();
    const { posts } = await listsPostsService.execute({ id });
    reply.status(200).send({ posts });
  }
  async update(request, reply) {
    const validateParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const validateBodySchema = import_zod2.z.object({
      title: import_zod2.z.string(),
      category: import_zod2.z.string(),
      body: import_zod2.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const { body, category, title } = validateBodySchema.parse(request.body);
    const updatePostService = new UpdatePostService();
    const { post } = await updatePostService.execute({ id, body, category, title });
    reply.status(201).send({ post });
  }
  async delete(request, reply) {
    const validateParamsSchema = import_zod2.z.object({
      id: import_zod2.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const deletePostService = new DeletePostService();
    await deletePostService.execute({ id });
    reply.status(204).send();
  }
};

// src/middlewares/verifyJwt.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

// src/http/controllers/posts/routes.ts
var postController = new PostController();
async function postsRoutes(app2) {
  app2.post("/create", { onRequest: [verifyJWT] }, postController.create);
  app2.get("/enterprises/:id", postController.list);
  app2.get("/:id", postController.find);
  app2.put("/:id", { onRequest: [verifyJWT] }, postController.update);
  app2.delete("/:id", { onRequest: [verifyJWT] }, postController.delete);
}

// src/app.ts
var import_zod5 = require("zod");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod3 = require("zod");
var envSchema = import_zod3.z.object({
  JWT_SECRET: import_zod3.z.string(),
  PORT: import_zod3.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}
var env = _env.data;

// src/http/controllers/session/controller.ts
var import_zod4 = require("zod");

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
    const validateBodySchema = import_zod4.z.object({
      username: import_zod4.z.string(),
      password: import_zod4.z.string(),
      enterpriseId: import_zod4.z.string()
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
    const validateBodySchema = import_zod4.z.object({
      username: import_zod4.z.string(),
      password: import_zod4.z.string(),
      enterpriseId: import_zod4.z.string()
    });
    const { username, password, enterpriseId } = validateBodySchema.parse(request.body);
    const registerUserService = new RegisterUserService();
    const { user } = await registerUserService.execute({ username, password, enterpriseId });
    reply.status(201).send({ user });
  }
};

// src/http/controllers/session/routes.ts
var sessionController = new SessionController();
async function sessionsRoutes(app2) {
  app2.post("/sessions", sessionController.login);
  app2.post("/users/create", sessionController.register);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "*"
});
app.register(import_jwt.default, {
  secret: env.JWT_SECRET
});
app.get("/ok", (_, reply) => {
  reply.status(200).send({ message: "ok" });
});
app.register(enterprisesRoutes, { prefix: "/enterprises" });
app.register(postsRoutes, { prefix: "/posts" });
app.register(sessionsRoutes);
app.setErrorHandler((error, _, reply) => {
  if (error instanceof import_zod5.ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: error.format() });
  }
  return reply.status(500).send({ message: "Internal server error.", error });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
