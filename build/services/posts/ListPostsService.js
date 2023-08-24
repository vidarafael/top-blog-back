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

// src/services/posts/ListPostsService.ts
var ListPostsService_exports = {};
__export(ListPostsService_exports, {
  ListPostsService: () => ListPostsService
});
module.exports = __toCommonJS(ListPostsService_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListPostsService
});
