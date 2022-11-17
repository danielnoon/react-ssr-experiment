import React from "react";
import { renderToString } from "react-dom/server";

import Fastify from "fastify";
import s from "@fastify/static";

import * as url from "url";

import App from "./app.js";

const app = Fastify();

app.register(s, {
  root: url.fileURLToPath(new URL(".", import.meta.url)) + "../build",
});

app.get("/api/data", async () => {
  return { hello: "world" };
});

app.get("/csr", async (_, res) => {
  res.header("Content-Type", "text/html; charset=utf-8");

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
        <script type="importmap">
          {
            "imports": {
              "react": "https://esm.sh/react@18.2.0",
              "react-dom": "https://esm.sh/react-dom@18.2.0"
            }
          }
        </script>
      </head>
      <body>
        <div id="root"></div>
        <noscript>You need javascript!</noscript>
        <script async type="module" src="/client-csr.js"></script>
      </body>
    </html>
  `);
});

app.get("/ssr", async (_, res) => {
  res.header("Content-Type", "text/html; charset=utf-8");

  const reactString = renderToString(<App message="React SSR!" />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR</title>
        <script type="importmap">
          {
            "imports": {
              "react": "https://esm.sh/react@18.2.0",
              "react-dom": "https://esm.sh/react-dom@18.2.0"
            }
          }
        </script>
      </head>
      <body>
        <div id="root">${reactString}</div>
        <script async type="module" src="/client-ssr.js"></script>
      </body>
    </html>
  `);
});

app.get("/", async (_, res) => {
  res.type("text/html").send(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <title>React SSR</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <body>
      <ul>
        <li><a href="/ssr">SSR Example</a></li>
        <li><a href="/csr">CSR Example</a></li>
      </ul>
    </body>
    </html>
  `);
});

app
  .listen({
    port: 3000,
  })
  .then(() => console.log("Server listening on port 3000"));
