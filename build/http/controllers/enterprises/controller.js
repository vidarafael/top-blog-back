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

// src/http/controllers/enterprises/controller.ts
var controller_exports = {};
__export(controller_exports, {
  EnterpriseController: () => EnterpriseController
});
module.exports = __toCommonJS(controller_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnterpriseController
});
