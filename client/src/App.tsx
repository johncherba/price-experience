// src/App.tsx
import React from "react";
import { gql, useQuery } from "@apollo/client";
import "./App.css";

const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_HELLO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.hello}</h1>
    </div>
  );
}

export default App;
