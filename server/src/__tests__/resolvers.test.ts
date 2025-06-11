import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";
import { resolvers, products } from "../resolvers";

const typeDefs = gql`
  type Product {
    id: ID!
    category: String!
    brand: String!
    price: Float!
  }

  type Query {
    getProducts: [Product!]!
  }
`;

describe("GraphQL Resolvers", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it("returns the full list of products from getProducts", async () => {
    const GET_PRODUCTS_QUERY = `
      query {
        getProducts {
          id
          category
          brand
          price
        }
      }
    `;

    const result = await server.executeOperation({ query: GET_PRODUCTS_QUERY });

    if (result.body.kind !== "single") {
      throw new Error("Expected a single GraphQL result");
    }

    const response = result.body.singleResult;

    // Cast for TypeScript
    const data = response.data as { getProducts: typeof products };

    expect(response.errors).toBeUndefined();
    expect(data.getProducts).toHaveLength(products.length);
    expect(data.getProducts).toEqual(expect.arrayContaining(products));
  });
});
