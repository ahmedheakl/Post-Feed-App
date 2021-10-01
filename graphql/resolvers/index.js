const postsResolver = require("./posts.js");
const usersResolver = require("./users.js");
const commentsResolver = require("./comments.js");

module.exports = {
  Query: {
    ...postsResolver.Query,
    ...usersResolver.Query,
  },

  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
  },
};
