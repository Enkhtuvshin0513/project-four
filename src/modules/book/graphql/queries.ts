import { Book } from "../@types";

const books: Book[] = [
  {
    title: "The Awaksdsening",
    author: "Kate Chopin"
  },
  {
    title: "City of Glass",
    author: "Paul Auster"
  }
];

export const bookQueries = {
  books: () => {
    return books;
  },

  book: (_parent: undefined, args: { title: string }, { user }: any) => {
    return books.find(book => book.title === args.title);
  }
};
