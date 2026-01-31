import { prisma } from "./prisma";

type ShipmentSortBy =
  | "CREATED_AT"
  | "UPDATED_AT"
  | "SHIPPER_NAME"
  | "RATE"
  | "STATUS";

type SortOrder = "ASC" | "DESC";

const sortFieldMap: Record<ShipmentSortBy, string> = {
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
  SHIPPER_NAME: "shipperName",
  RATE: "rate",
  STATUS: "status",
} as const;

export const resolvers = {
  Query: {
    shipments: async (_: any, args: any) => {
      const page = args.pagination?.page ?? 1;
      const pageSize = args.pagination?.pageSize ?? 10;

      const sortBy: ShipmentSortBy =
        args.sort?.by && args.sort.by in sortFieldMap
          ? args.sort.by
          : "CREATED_AT";

      const sortOrder: SortOrder =
        args.sort?.order === "ASC" || args.sort?.order === "DESC"
          ? args.sort.order
          : "DESC";

      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const [items, totalCount] = await Promise.all([
        prisma.shipment.findMany({
          skip,
          take,
          orderBy: {
            [sortFieldMap[sortBy]]: sortOrder.toLowerCase(),
          },
        }),
        prisma.shipment.count(),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        items,
        pageInfo: {
          page,
          pageSize,
          totalCount,
          totalPages,
        },
      };
    },

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
