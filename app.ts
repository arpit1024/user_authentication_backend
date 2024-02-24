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

app.use("/user-authentication", routes);

const PORT = process.env.PORT || 9200;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
