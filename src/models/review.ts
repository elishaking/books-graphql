import { Schema, Document, model } from "mongoose";

interface IReview {
  reviewerName: string;
  title: string;
  message: string;
  rating: number;
}

interface IReviewDoc extends IReview, Document {}

const ReviewSchema = new Schema<IReview>(
  {
    reviewerName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Review = model<IReviewDoc>("Review", ReviewSchema);
