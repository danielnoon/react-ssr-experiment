import React from "react";
import Fetcher from "./components/fetcher.js";
import Form from "./components/form.js";

export default function App({ message }: { message: string }) {
  return (
    <div>
      <h1>{message}</h1>
      <hr />
      <Fetcher />
      <hr />
      <Form />
    </div>
  );
}
