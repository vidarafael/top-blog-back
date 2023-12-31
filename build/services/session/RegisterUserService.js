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

// src/services/session/RegisterUserService.ts
var RegisterUserService_exports = {};
__export(RegisterUserService_exports, {
  RegisterUserService: () => RegisterUserService
});
module.exports = __toCommonJS(RegisterUserService_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterUserService
});
