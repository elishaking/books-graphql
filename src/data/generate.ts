import { Chance } from "chance";
import { Types, connect, disconnect } from "mongoose";

import { IAuthor, IBook, IReview, Author, Review, Book } from "../models";
import { env } from "../config";

const chance = new Chance();
const N_AUTHORS = 700;
const N_REVIEWS = 13000;
const N_BOOKS = 1300;

function generateAuthors(n: number) {
  return new Array(n).fill(0).map(() => {
    const author: IAuthor = {
      _id: new Types.ObjectId(),
      firstName: chance.first(),
      lastName: chance.last(),
      dateOfBirth: chance.birthday(),
      bio: chance.sentence({ words: 50 }),
    };

    return author;
  });
}

function generateReviews(n: number) {
  return new Array(n).fill(0).map(() => {
    const review: IReview = {
      _id: new Types.ObjectId(),
      title: chance.sentence({ words: 5 }),
      message: chance.sentence({ words: chance.integer({ min: 10, max: 20 }) }),
      rating: chance.integer({ max: 5, min: 0 }),
      reviewerName: chance.name({ full: true }),
    };

    return review;
  });
}

async function generateBooks(n: number) {
  const authors = generateAuthors(N_AUTHORS);

  const reviews = generateReviews(N_REVIEWS);
  const books: IBook[] = [];

  for (let i = 0; i < n; i++) {
    const reviewStartIdx = chance.integer({ max: N_REVIEWS - 1, min: 0 });
    const reviewEndIdx = chance.integer({
      max: reviewStartIdx + 30,
      min: reviewStartIdx,
    });
    books.push({
      title: `${chance.name()} ${chance.name({ full: false })}`,
      description: chance.sentence({
        words: chance.integer({ min: 100, max: 300 }),
      }),
      shortDescription: chance.sentence({
        words: chance.integer({ min: 20, max: 30 }),
      }),
      author: authors[chance.integer({ max: N_AUTHORS - 1, min: 0 })]._id,
      reviews: reviews
        .slice(reviewStartIdx, reviewEndIdx)
        .map((review) => review._id),
    });
  }

  await Author.insertMany(authors);
  await Review.insertMany(reviews);
  await Book.insertMany(books);
}

connect(env.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log("DB connected");
    return generateBooks(N_BOOKS);
  })
  .then(() => {
    console.log("Books generated");
    return disconnect();
  })
  .then(() => {
    console.log("DB disconnected");
  })
  .catch((err) => console.error(err));
