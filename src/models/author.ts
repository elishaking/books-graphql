import { Schema, Document, model } from "mongoose";

interface IAuthor {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  bio: string;
}

interface IAuthorDoc extends IAuthor, Document {}

const AuthorSchema = new Schema<IAuthor>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Author = model<IAuthorDoc>("Author", AuthorSchema);
