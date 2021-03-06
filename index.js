const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index.js");
const { MONGODB } = require("./config.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MONGODB CONNECTED");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => console.log(`Server Running at ${res.url}`))
  .catch((err) => {
    console.error(err);
  });
