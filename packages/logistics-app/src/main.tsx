import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.sass";
import "virtual:windi.css";
import MainRoutes from "./routes/index.routes";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange]
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider value={client}>
    <MainRoutes />
  </Provider>
  // </React.StrictMode>
);
