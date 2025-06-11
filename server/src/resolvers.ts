// src/resolvers.ts

export const products = [
  {
    id: "1",
    category: "TV",
    brand: "Samsung",
    price: 299.99,
  },
  {
    id: "2",
    category: "Washing Machine",
    brand: "Whirlpool",
    price: 499.99,
  },
  {
    id: "3",
    category: "Speaker",
    brand: "Bose",
    price: 199.99,
  },
];

export const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server!",
    getProducts: () => {
      return products;
    },
  },
};
