"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_yoga_1 = require("graphql-yoga");
const resolvers_1 = require("./resolvers");
exports.schema = (0, graphql_yoga_1.createSchema)({
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
    resolvers: resolvers_1.resolvers,
});
