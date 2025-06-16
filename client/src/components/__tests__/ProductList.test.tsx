// ProductList.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../ProductList/index";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { gql } from "@apollo/client";

// Define the same query used in the component
const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      brand
      category
      price
    }
  }
`;

// Sample mock data
const mockProducts = [
  {
    id: "1",
    brand: "Apple",
    category: "Electronics",
    price: 999.99,
  },
  {
    id: "2",
    brand: "Samsung",
    category: "Electronics",
    price: 799.99,
  },
];

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        getProducts: mockProducts,
      },
    },
  },
];

describe("ProductList", () => {
  test("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  test("renders product list after data is fetched", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    // Wait for the list to render
    await waitFor(() => {
      expect(screen.getByText(/Product List/i)).toBeInTheDocument();
    });

    // Assert individual product entries
    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
    expect(screen.getByText(/Samsung/i)).toBeInTheDocument();
  });

  test("renders error message on network error", async () => {
    const errorMocks: MockedResponse[] = [
      {
        request: {
          query: GET_PRODUCTS,
        },
        error: new Error("Network error"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("Error: Failed to fetch products");
  });
});
