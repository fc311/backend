"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = require("./prisma");
exports.resolvers = {
    Query: {
        shipments: () => prisma_1.prisma.shipment.findMany(),
        shipment: (_, args) => prisma_1.prisma.shipment.findUnique({ where: { id: args.id } }),
    },
    Mutation: {
        addShipment: (_, args) => prisma_1.prisma.shipment.create({ data: args }),
        updateShipment: (_, args) => prisma_1.prisma.shipment.update({
            where: { id: args.id },
            data: {
                status: args.status ?? undefined,
                rate: args.rate ?? undefined,
            },
        }),
    },
};
