import gql from "graphql-tag";

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likesCount
      comments {
        id
        body
        username
        createdAt
      }
      commentsCount
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        username
        id
      }
      likesCount
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      likesCount
      commentsCount
      likes {
        username
        id
      }
      comments {
        body
        username
        createdAt
        id
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($body: String!, $postId: ID!) {
    createComment(body: $body, postId: $postId) {
      comments {
        body
        createdAt
        id
        username
      }
      commentsCount
      id
    }
  }
`;

export {
  CREATE_POST,
  REGISTER_USER,
  LIKE_POST,
  DELETE_POST,
  DELETE_COMMENT,
  CREATE_COMMENT,
};
