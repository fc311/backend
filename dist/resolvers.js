"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = require("./prisma");
const graphql_1 = require("graphql");
const sortFieldMap = {
    CREATED_AT: "createdAt",
    UPDATED_AT: "updatedAt",
    SHIPPER_NAME: "shipperName",
    RATE: "rate",
    STATUS: "status",
};
function requireAdmin(role) {
    if (role !== "ADMIN") {
        throw new graphql_1.GraphQLError("Not authorized: ADMIN role required", {
            extensions: {
                code: "FORBIDDEN",
            },
        });
    }
}
exports.resolvers = {
    Query: {
        shipments: async (_, args) => {
            const page = args.pagination?.page ?? 1;
            const pageSize = args.pagination?.pageSize ?? 10;
            const sortBy = args.sort?.by && args.sort.by in sortFieldMap
                ? args.sort.by
                : "CREATED_AT";
            const sortOrder = args.sort?.order === "ASC" || args.sort?.order === "DESC"
                ? args.sort.order
                : "DESC";
            const skip = (page - 1) * pageSize;
            const take = pageSize;
            const where = {};
            if (args.filter?.status) {
                where.status = args.filter.status;
            }
            if (args.filter?.shipperName) {
                where.shipperName = {
                    contains: args.filter.shipperName,
                    mode: "insensitive",
                };
            }
            if (args.filter?.carrierName) {
                where.carrierName = {
                    contains: args.filter.carrierName,
                    mode: "insensitive",
                };
            }
            const [items, totalCount] = await Promise.all([
                prisma_1.prisma.shipment.findMany({
                    where,
                    skip,
                    take,
                    orderBy: {
                        [sortFieldMap[sortBy]]: sortOrder.toLowerCase(),
                    },
                }),
                prisma_1.prisma.shipment.count({ where }),
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
        shipment: (_, args) => prisma_1.prisma.shipment.findUnique({ where: { id: args.id } }),
    },
    Mutation: {
        addShipment: (_, args, ctx) => {
            requireAdmin(ctx.role);
            return prisma_1.prisma.shipment.create({ data: args });
        },
        updateShipment: (_, args, ctx) => {
            requireAdmin(ctx.role);
            return prisma_1.prisma.shipment.update({
                where: { id: args.id },
                data: {
                    status: args.status ?? undefined,
                    rate: args.rate ?? undefined,
                },
            });
        },
    },
};
