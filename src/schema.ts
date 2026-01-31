import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: `
    type Shipment {
      id: ID!
      shipperName: String!
      carrierName: String!
      pickupLocation: String!
      deliveryLocation: String!
      trackingNumber: String!
      rate: Float!
      status: String!
      createdAt: String!
      updatedAt: String!
    }

    # --------------------
    # Pagination & Sorting
    # --------------------

    enum SortOrder {
      ASC
      DESC
    }

    enum ShipmentSortBy {
      CREATED_AT
      UPDATED_AT
      SHIPPER_NAME
      RATE
      STATUS
    }

    input PaginationInput {
      page: Int = 1
      pageSize: Int = 10
    }

    input ShipmentSortInput {
      by: ShipmentSortBy = CREATED_AT
      order: SortOrder = DESC
    }

    type PageInfo {
      page: Int!
      pageSize: Int!
      totalCount: Int!
      totalPages: Int!
    }

    type ShipmentConnection {
      items: [Shipment!]!
      pageInfo: PageInfo!
    }

    # --------
    # Queries
    # --------

    type Query {
      shipments(
        pagination: PaginationInput
        sort: ShipmentSortInput
      ): ShipmentConnection!

      shipment(id: ID!): Shipment
    }

    # ----------
    # Mutations
    # ----------

    type Mutation {
      addShipment(
        shipperName: String!
        carrierName: String!
        pickupLocation: String!
        deliveryLocation: String!
        trackingNumber: String!
        rate: Float!
        status: String!
      ): Shipment!

      updateShipment(
        id: ID!
        status: String
        rate: Float
      ): Shipment!
    }
  `,
  resolvers,
});
