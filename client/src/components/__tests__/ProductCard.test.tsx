import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "@apollo/client";
// import { cleanup } from "@testing-library/react";
// afterEach(cleanup);

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

const mockedProduct = {
  id: "1",
  brand: "Sony",
  category: "Audio",
  price: 299.99,
};

const successMock = [
  {
    request: { query: GET_PRODUCTS },
    result: {
      data: { getProducts: [mockedProduct] },
    },
  },
];

const emptyMock = [
  {
    request: { query: GET_PRODUCTS },
    result: {
      data: { getProducts: [] },
    },
  },
];

const errorMock = [
  {
    request: { query: GET_PRODUCTS },
    error: new Error("Network error"),
  },
];

describe("ProductCard", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );
    expect(screen.getByText(/loading product/i)).toBeInTheDocument();
  });

  it("renders the first product after fetch", async () => {
    render(
      <MockedProvider mocks={successMock} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/First Product/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Sony/i)).toBeInTheDocument();
    expect(screen.getByText(/Audio/i)).toBeInTheDocument();
    expect(screen.getByText(/\$299.99/)).toBeInTheDocument();
  });

  it("renders an error message on fetch failure", async () => {
    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("Error: Failed to fetch products");
  });

  it("renders no product message if product list is empty", async () => {
    render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No product found/i)).toBeInTheDocument();
    });
  });
});
