// ProductList.tsx
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

const ProductList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading products...</p>;
  if (error)
    return <p data-testid="error-message">Error: Failed to fetch products</p>;

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {data.getProducts.map(
          (product: {
            id: string;
            brand: string;
            category: string;
            price: number;
          }) => (
            <li key={product.id}>
              <strong>{product.brand}</strong> - {product.category} - $
              {product.price.toFixed(2)}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ProductList;
