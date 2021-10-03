import gql from "graphql-tag";

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
      }
      createdAt
      likesCount
      commentsCount
    }
  }
`;

const SINGLE_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export { FETCH_POSTS_QUERY, SINGLE_POST_QUERY };
