import { Schema, Document, Types, model } from "mongoose";

interface IBook {
  title: string;
  description: string;
  author: string;
}

interface IBookDoc extends IBook, Document {}

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);

export const Book = model<IBookDoc>("Book", BookSchema);
