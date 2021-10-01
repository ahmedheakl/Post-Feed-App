const Post = require("../../models/Post");
const check_user = require("../../utils/check_user");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    createComment: async (_, { body, postId }, context) => {
      const { username } = check_user(context);
      if (body.trim() == "") {
        throw new UserInputError("Body must not be empty");
      }
      try {
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });

          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },

    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = check_user(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id == commentId
          );
          if (post.comments[commentIndex].username == username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else throw new AuthenticationError("You are not the comment owner");
        } else throw new UserInputError("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
