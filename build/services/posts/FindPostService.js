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

// src/services/posts/FindPostService.ts
var FindPostService_exports = {};
__export(FindPostService_exports, {
  FindPostService: () => FindPostService
});
module.exports = __toCommonJS(FindPostService_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FindPostService
});
