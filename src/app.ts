import express from "express";
import { graphqlHTTP } from "express-graphql";

import { schema } from "./graphql/schema";

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
