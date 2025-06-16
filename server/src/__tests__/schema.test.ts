import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../schema";

type GetProductsData = {
  getProducts: Array<{
    id: string;
    brand: string;
    category: string;
    price: number;
  }>;
};

const mockResolvers = {
  Query: {
    getProducts: () => [
      {
        id: "1",
        brand: "Apple",
        category: "Electronics",
        price: 999.99,
      },
    ],
  },
};

describe("GraphQL Schema", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers: mockResolvers,
    });
    await server.start();
  });

  // afterAll(async () => {
  //   await server.stop();
  // });

  it("returns products from getProducts query", async () => {
    const GET_PRODUCTS_QUERY = `
      query {
        getProducts {
          id
          brand
          category
          price
        }
      }
    `;

    const result = await server.executeOperation({ query: GET_PRODUCTS_QUERY });

    // Handle single-result only
    if (result.body.kind !== "single") {
      throw new Error("Expected a single GraphQL result");
    }

    const response = result.body.singleResult;

    // Confirm no errors
    expect(response.errors).toBeUndefined();

    // Confirm and cast data
    expect(response.data).toBeDefined();
    const data = response.data as GetProductsData;

    // Assertions
    expect(data.getProducts).toHaveLength(1);
    expect(data.getProducts[0]).toMatchObject({
      id: "1",
      brand: "Apple",
      category: "Electronics",
      price: 999.99,
    });
  });
});
