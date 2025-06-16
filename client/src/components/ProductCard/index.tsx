// ProductCard.tsx
import React from "react";
import { useQuery, gql } from "@apollo/client";

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

const ProductCard: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading product...</p>;
  if (error)
    return <p data-testid="error-message">Error: Failed to fetch products</p>;

  const product = data?.getProducts?.[0] || null;

  if (!product) return <p>No product found.</p>;

  const { brand, category, price } = product;

  return (
    <div>
      <h2>First Product</h2>
      <p>
        <strong>{brand}</strong> - {category} - ${price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
