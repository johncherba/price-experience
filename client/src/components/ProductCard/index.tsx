// import React, { useEffect, useState } from "react";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  brand: string;
  category: string;
  price: number;
}

const GET_PRODUCTS_QUERY = `
  query GetProducts {
    getProducts {
      id
      brand
      category
      price
    }
  }
`;

const ProductCard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: GET_PRODUCTS_QUERY }),
        });

        const json = await response.json();
        const firstProduct: Product | undefined = json.data?.getProducts?.[0];

        if (firstProduct) {
          setProduct(firstProduct);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p data-testid="error-message">Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <h2>First Product</h2>
      <p>
        <strong>{product.brand}</strong> - {product.category} - $
        {product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
