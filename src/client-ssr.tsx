import App from "./app.js";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.hydrate(<App message="React SSR!" />, document.getElementById("root"));
