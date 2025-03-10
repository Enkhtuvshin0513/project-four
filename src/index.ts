import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// import { expressMiddleware } from "@apollo/server/express4";
// import express from "express";

// const app = express();

interface Book {
  title: string;
  author: string;
  authorAndTitle: string;
}

const typeDefs = `
  type Book {
    title: String 
    author: String
  }

  type Player {
    firstName: String
    age: Int
    height: Float
    active: Boolean

    favoriteBooks: [Book]
  }
    
  type Query {
    books(title: String): [Book]
    book(title: String!): Book
  }

  type Mutation {
    bookAdd(title: String!, author: String!): String
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin"
  },
  {
    title: "City of Glass",
    author: "Paul Auster"
  }
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (_parent: undefined, args: { title?: string }, context: any) => {
      return books;
    },
    book: (_parent: undefined, args: { title: string }) => {
      return books.find(book => book.title === args.title);
    }
  },

  Mutation: {
    bookAdd: (_parent: undefined, args: { title: string; author: string }) => {
      books.push(args);

      return "Nom amjilttai nemlee";
    }
  }

  // Book: {
  //   authorAndTitle: (parent: Book) => {
  //     return `${parent.author} ${parent.title}`;
  //   }
  // }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

// app.get("/books", (_req, res) => {
//   const newBooks = books.map((book: any) => {
//     book.authorAndTitle = `${book.author} ${book.title}`;
//     return book;
//   });

//   res.send(newBooks);
// });

// app.get("/book", (_req, res) => {
//   const newBooks = books.map((book: any) => {
//     book.authorAndTitle = `${book.author} ${book.title}`;
//     return book;
//   });

//   res.send(newBooks[0]);
// });

const startServer = async () => {
  await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log("server started on 4000");
  // await server.start();

  // app.use("/graphql", express.json(), expressMiddleware(server));

  // app.listen(3000, () => {
  //   console.log("server started on 3000");
  // });
};

startServer();
