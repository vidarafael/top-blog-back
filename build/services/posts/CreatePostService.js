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

// src/services/posts/CreatePostService.ts
var CreatePostService_exports = {};
__export(CreatePostService_exports, {
  CreatePostService: () => CreatePostService
});
module.exports = __toCommonJS(CreatePostService_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePostService
});
