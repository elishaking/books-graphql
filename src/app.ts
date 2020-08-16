import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import { graphqlHTTP } from "express-graphql";

import { schema } from "./graphql/schema";
import { env } from "./config";

const app = express();
app.use(cors());

connect(env.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("DB connected");
});

app.use((req, _, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(env.port, () =>
  console.log(`Server listening on port: ${env.port}`)
);
