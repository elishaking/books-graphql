import express from "express";
import { connect } from "mongoose";
import { graphqlHTTP } from "express-graphql";

import { schema } from "./graphql/schema";
import { env } from "./config";

const app = express();

connect(env.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("DB connected");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
