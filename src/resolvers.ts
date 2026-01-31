import { prisma } from "./prisma";

export const resolvers = {
  Query: {
    shipments: () => prisma.shipment.findMany(),
    shipment: (_: any, args: { id: string }) =>
      prisma.shipment.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    addShipment: (_: any, args: any) => prisma.shipment.create({ data: args }),

    updateShipment: (_: any, args: any) =>
      prisma.shipment.update({
        where: { id: args.id },
        data: {
          status: args.status ?? undefined,
          rate: args.rate ?? undefined,
        },
      }),
  },
};
