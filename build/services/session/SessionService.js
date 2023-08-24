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

// src/services/session/SessionService.ts
var SessionService_exports = {};
__export(SessionService_exports, {
  SessionService: () => SessionService
});
module.exports = __toCommonJS(SessionService_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/services/session/SessionService.ts
var import_argon2 = require("argon2");
var SessionService = class {
  async execute({ username, password }) {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      throw new Error("Credentials errors.");
    }
    const checkPasswordMatch = await (0, import_argon2.verify)(user.password_hash, password);
    if (!checkPasswordMatch) {
      throw new Error("Credentials errors.");
    }
    return { user };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SessionService
});
