import { Schema, Document, Types, model } from "mongoose";
import { IAuthor } from "./author";
import { IReview } from "./review";

export interface IBook {
  title: string;
  description: string;
  shortDescription: string;
  author: IAuthor;
  reviews: IReview[];
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
    shortDescription: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "Author",
    },
    reviews: {
      type: [
        {
          type: Types.ObjectId,
          ref: "Review",
        },
      ],
    },
  },
  { timestamps: true }
);

export const Book = model<IBookDoc>("Book", BookSchema);
