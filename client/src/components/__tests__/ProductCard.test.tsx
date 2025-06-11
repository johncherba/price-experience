import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ProductCard from "../ProductCard";
import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      category
      brand
      price
    }
  }
`;

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        getProducts: [
          {
            id: "1",
            category: "Books",
            brand: "Penguin",
            price: 19.99,
          },
        ],
      },
    },
  },
];

describe("<ProductCard />", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders product data after loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Books")).toBeInTheDocument();
      expect(screen.getByText("Penguin")).toBeInTheDocument();
      expect(screen.getByText("$19.99")).toBeInTheDocument();
    });
  });
});
