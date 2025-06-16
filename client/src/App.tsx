// src/App.tsx
import React from "react";
import "./App.css";
import ProductCard from "./components/ProductCard/index";
import ProductList from "./components/ProductList/index";

function App() {
  return (
    <div>
      <ProductCard />
      <ProductList />
    </div>
  );
}

export default App;
