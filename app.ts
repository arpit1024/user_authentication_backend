import "reflect-metadata";
import express from "express";
import { Container } from "typedi";
import routes from "./routes";
import { DatabaseModels } from "./config/database";
import { cors } from "./cors";

Container.get(DatabaseModels);
const app = express();

app.use(cors);
app.use(express.json());

app.get("/api", (req, res) => {
  const path = `/api/item/${Math.random()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.use("/relosy", routes);

const PORT = process.env.PORT || 9200;

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
