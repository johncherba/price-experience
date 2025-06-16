import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../schema";
import { resolvers, products } from "../resolvers";

describe("Integration test using executeOperation", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  it("should return all products from getProducts query", async () => {
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
      throw new Error("Expected single result");
    }

    const response = result.body.singleResult;

    // Typecast to the known data shape
    const data = response.data as { getProducts: typeof products };

    expect(response.errors).toBeUndefined();
    expect(data.getProducts).toHaveLength(products.length);
    expect(data.getProducts).toEqual(expect.arrayContaining(products));
  });
});
