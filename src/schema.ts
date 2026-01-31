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

    type Query {
      shipments: [Shipment!]!
      shipment(id: ID!): Shipment
    }

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
