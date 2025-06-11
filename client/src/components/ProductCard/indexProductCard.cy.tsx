import React from "react";
import ProductCard from "./index";

// describe("<ProductCard />", () => {
//   it("renders", () => {
//     // see: https://on.cypress.io/mounting-react
//     cy.mount(<ProductCard />);
//   });
// });

// cypress/component/ProductCard.cy.tsx
import { mount } from "cypress/react";
import { MockedProvider } from "@apollo/client/testing";
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

const mockSuccess = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        getProducts: [
          {
            id: "1",
            category: "Electronics",
            brand: "Sony",
            price: 299.99,
          },
          {
            id: "2",
            category: "Books",
            brand: "Penguin",
            price: 19.99,
          },
        ],
      },
    },
  },
];

const mockError = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    error: new Error("Failed to fetch"),
  },
];

describe("<ProductCard />", () => {
  it("renders loading state", () => {
    mount(
      <MockedProvider mocks={mockSuccess} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    cy.contains("Loading...").should("exist");
  });

  it("renders product cards on success", () => {
    mount(
      <MockedProvider mocks={mockSuccess} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    // Wait for mocked response
    cy.contains("Electronics").should("exist");
    cy.contains("Sony").should("exist");
    cy.contains("$299.99").should("exist");

    cy.contains("Books").should("exist");
    cy.contains("Penguin").should("exist");
    cy.contains("$19.99").should("exist");
  });

  it("renders error state", () => {
    mount(
      <MockedProvider mocks={mockError} addTypename={false}>
        <ProductCard />
      </MockedProvider>
    );

    // Wait a bit for Apollo error handling
    cy.contains(/Error:/).should("exist");
  });
});
