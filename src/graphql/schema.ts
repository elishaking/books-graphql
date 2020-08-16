import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { Book } from "../models";

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    bio: { type: GraphQLString },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: "ReviewType",
  fields: () => ({
    reviewerName: { type: GraphQLString },
    title: { type: GraphQLString },
    message: { type: GraphQLString },
    rating: { type: GraphQLInt },
  }),
});

const BookType = new GraphQLObjectType({
  name: "BookType",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: AuthorType },
    reviews: { type: GraphQLList(ReviewType) },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      args: {
        first: { type: GraphQLInt },
      },
      resolve(_, args) {
        return Book.find()
          .limit(args.first)
          .populate("author")
          .populate("reviews");
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
});
