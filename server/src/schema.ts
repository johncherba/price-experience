// src/schema.ts
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Product {
    id: ID!
    brand: String!
    category: String!
    price: Float!
  }

  type Query {
    getProducts: [Product!]!
  }
`;
