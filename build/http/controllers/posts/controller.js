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

// src/http/controllers/posts/controller.ts
var controller_exports = {};
__export(controller_exports, {
  PostController: () => PostController
});
module.exports = __toCommonJS(controller_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
var import_zod = require("zod");
var PostController = class {
  async create(request, reply) {
    const validateBodySchema = import_zod.z.object({
      title: import_zod.z.string(),
      category: import_zod.z.string(),
      body: import_zod.z.string(),
      enterpriseId: import_zod.z.string()
    });
    const { title, category, body, enterpriseId } = validateBodySchema.parse(request.body);
    const createPostService = new CreatePostService();
    const { post } = await createPostService.execute({ title, category, body, enterpriseId });
    reply.status(201).send({ post });
  }
  async find(request, reply) {
    const validateParamsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const findPostService = new FindPostService();
    const { post } = await findPostService.execute({ id });
    reply.status(200).send({ post });
  }
  async list(request, reply) {
    const validateParamsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const listsPostsService = new ListPostsService();
    const { posts } = await listsPostsService.execute({ id });
    reply.status(200).send({ posts });
  }
  async update(request, reply) {
    const validateParamsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const validateBodySchema = import_zod.z.object({
      title: import_zod.z.string(),
      category: import_zod.z.string(),
      body: import_zod.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const { body, category, title } = validateBodySchema.parse(request.body);
    const updatePostService = new UpdatePostService();
    const { post } = await updatePostService.execute({ id, body, category, title });
    reply.status(201).send({ post });
  }
  async delete(request, reply) {
    const validateParamsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = validateParamsSchema.parse(request.params);
    const deletePostService = new DeletePostService();
    await deletePostService.execute({ id });
    reply.status(204).send();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostController
});
