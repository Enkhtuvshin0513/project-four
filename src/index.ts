import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

import { expressMiddleware } from "@apollo/server/express4";
import {
  bookSchemaTypes,
  bookSchemaQueries,
  bookSchemaMutations
} from "../src/modules/book/graphql/schema";

import { bookQueries } from "../src/modules/book/graphql/queries";

import express from "express";
import { Book } from "./modules/book/@types";
import { bookMutations } from "./modules/book/graphql/mutations";
import { bookCustomResolvers } from "./modules/book/graphql/resolver";

const app = express();

interface Player {
  firstName: string;
  age: number;
  height: number;
  active: boolean;
  favoriteBooks?: String[];
}

interface User {
  firstName: string;
}

interface Context {
  user: User;
}

const typeDefs = `
  ${bookSchemaTypes}

  type Player {
    firstName: String
    age: Int
    height: Float
    active: Boolean

    favoriteBooks: [Book]
  }
    
  type Query {
    ${bookSchemaQueries}
    players: [Player]
  }

  type Mutation {
    ${bookSchemaMutations}
  }
`;

const players: Player[] = [
  {
    firstName: "Bat",
    age: 18,
    active: true,
    height: 6.7,
    favoriteBooks: ["The Awaksdsening", "City of Glass"]
  }
];

const resolvers = {
  Query: {
    ...bookQueries,

    players: () => {
      return players;
    }
  },

  Mutation: {
    ...bookMutations
  },

  Book: {
    ...bookCustomResolvers
  },

  Player: {
    favoriteBooks: (parent: Player) => {
      const favoriteBooks: Book[] = [];

      return favoriteBooks;
    }
  }
};

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});

// app.get("/books", (_req, res) => {
//   const newBooks = books.map((book: any) => {
//     book.authorAndTitle = `${book.author} ${book.title}`;
//     return book;
//   });

//   return newBooks;
// });

// app.get("/book", (_req, res) => {
//   const newBooks = books.map((book: any) => {
//     book.authorAndTitle = `${book.author} ${book.title}`;
//     return book;
//   });

//   res.send(newBooks[0]);
// });

const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async () => {
        return { user: { firstName: "bat" } };
      }
    })
  );

  app.listen(4000, () => {
    console.log("server started on 4000");
  });
};

startServer();
