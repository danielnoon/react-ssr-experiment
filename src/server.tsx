import React from "react";
import Fastify from "fastify";
import { renderToString } from "react-dom/server";
import * as url from "url";
import s from "@fastify/static";

import App from "./app.js";

const app = Fastify();

app.register(s, {
  root: url.fileURLToPath(new URL(".", import.meta.url)) + "../build",
});

app.get("/api/data", async () => {
  return { hello: "world" };
});

app.get("/", async (_, res) => {
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
        <script async type="module" src="/client.js"></script>
      </body>
    </html>
  `);
});

app
  .listen({
    port: 3000,
  })
  .then(() => console.log("Server listening on port 3000"));
