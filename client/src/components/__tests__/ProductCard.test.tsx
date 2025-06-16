import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import ProductCard from "../ProductCard";

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

const mockProduct = {
  id: "1",
  brand: "Sony",
  category: "Audio",
  price: 299.99,
};

const mockSuccessResponse = {
  data: {
    getProducts: [mockProduct],
  },
};

const mockEmptyResponse = {
  data: {
    getProducts: [],
  },
};

const mockErrorResponse = {
  errors: [{ message: "Network error" }],
};

describe("ProductCard", () => {
  it("renders loading state initially", () => {
    // Don't resolve fetch to simulate loading
    jest.spyOn(global, "fetch").mockImplementation(
      () => new Promise(() => {}) // keep pending
    );

    render(<ProductCard />);
    expect(screen.getByText(/loading product/i)).toBeInTheDocument();
  });

  it("renders the first product after successful fetch", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockSuccessResponse,
    } as Response);

    render(<ProductCard />);

    await waitFor(() => {
      expect(screen.getByText(/First Product/i)).toBeInTheDocument();
      expect(screen.getByText(/Sony/i)).toBeInTheDocument();
      expect(screen.getByText(/Audio/i)).toBeInTheDocument();
      expect(screen.getByText(/\$299.99/)).toBeInTheDocument();
    });
  });

  it("renders no product message when product list is empty", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockEmptyResponse,
    } as Response);

    render(<ProductCard />);

    await waitFor(() => {
      expect(screen.getByText(/No product found/i)).toBeInTheDocument();
    });
  });

  it("renders an error message on fetch failure", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Fetch failed"));

    render(<ProductCard />);

    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("Error: Failed to fetch products");
  });
});
