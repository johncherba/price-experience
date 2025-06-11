// src/schema.ts
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    getProducts: [Product]
  }

  type Product {
    id: ID
    category: String
    brand: String
    price: Float
  }
`;
