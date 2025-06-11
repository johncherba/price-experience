// components/ProductCard.tsx
import { gql, useQuery } from "@apollo/client";

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

type Products = {
  id: Number;
  category: String;
  brand: String;
  price: GLfloat;
};

const ProductCard = () => {
  const {
    data: getProductsData,
    loading: getProductsLoading,
    error: getProductsError,
  } = useQuery(GET_PRODUCTS);

  if (getProductsLoading) return <p>Loading...</p>;
  if (getProductsError) return <p>Error: {getProductsError.message}</p>;

  //   console.log(getProductsData.getProducts);

  return (
    <>
      {getProductsData.getProducts.map((products: Products, index: number) => (
        <div key={index}>
          <div>{products.category}</div>
          <div>{products.brand}</div>
          <div>${products.price}</div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
