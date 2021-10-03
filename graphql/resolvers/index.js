const postsResolver = require("./posts.js");
const usersResolver = require("./users.js");
const commentsResolver = require("./comments.js");

module.exports = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
  },

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
