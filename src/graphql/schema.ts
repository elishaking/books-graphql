import { GraphQLSchema, GraphQLObjectType } from "graphql";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {},
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
