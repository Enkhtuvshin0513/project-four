import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
  type Book {
    title: String
    author: String

    authorAndTitle: String
  }

  type Query {
    books(title: String): [Book]
    book(title: String!): Book
  }

  type Mutation{
    bookAdd(title: String!, author: String!): [Book]
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
    books: (_parent: unknown) => {
      return books;
    },
    book: (_parent: unknown, args: { title: string }) => {
      return books.find(book => book.title === args.title);
    }
  },

  Mutation: {
    bookAdd: (_parent: unknown, args: { title: string; author: string }) => {
      books.push(args);

      return books;
    }
  },

  Book: {
    authorAndTitle: (parent: any) => {
      return `${parent.author} ${parent.title}`;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
