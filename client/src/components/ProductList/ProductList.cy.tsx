// ProductList.cy.tsx
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import ProductList from ".";
import { gql } from "@apollo/client";

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

const successMocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        getProducts: [
          {
            id: "1",
            brand: "Samsung",
            category: "TV",
            price: 499.99,
          },
          {
            id: "2",
            brand: "Apple",
            category: "Phone",
            price: 999.99,
          },
        ],
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    error: new Error("Failed to fetch"),
  },
];

describe("ProductList Component", () => {
  it("renders loading state", () => {
    cy.mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );
    cy.contains(/loading products/i).should("be.visible");
  });

  it("renders list of products", () => {
    cy.mount(
      <MockedProvider mocks={successMocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    cy.contains("Loading products...").should("exist");

    cy.contains("Product List").should("exist");
    cy.contains("Samsung").should("exist");
    cy.contains("Apple").should("exist");
    cy.contains("$499.99").should("exist");
    cy.contains("$999.99").should("exist");
  });

  it("renders error message on failure", () => {
    cy.mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    cy.contains("Error: Failed to fetch products").should("exist");
  });
});
