const Post = require("../../models/Post");
const check_user = require("../../utils/check_user");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = check_user(context);
      if (body.trim() == "") {
        throw new Error("Body field must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const res = await newPost.save();
      return res;
    },

    async deletePost(_, { postId }, context) {
      const user = check_user(context);

      try {
        const post = await Post.findById(postId);
        if (post.username == user.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("You are not the post owner");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(_, { postId }, context) {
      const { username } = check_user(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            post.likes = post.likes.filter(
              (like) => like.username !== username
            );
          } else {
            post.likes.push({
              username,
              createdAt: new Date().toISOString(),
            });
          }

          await post.save();
          return post;
        } else throw new UserInputError("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
