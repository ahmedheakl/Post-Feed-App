import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition, Label } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";
import { FETCH_POSTS_QUERY } from "../utils/queries";

import Post from "../components/PostContainer";
import CreatePost from "../components/CreatePost";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  let posts;
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    posts = data.getPosts;
  }

  return (
    <>
      {user ? (
        <>
          <Label color="blue" style={{ marginLeft: "65vw" }} tag>
            Logged in
          </Label>
          <CreatePost />
        </>
      ) : (
        <Label
          color="red"
          as={Link}
          style={{ marginLeft: 979 }}
          to="/login"
          tag
        >
          Login To Create Post
        </Label>
      )}
      <Grid columns="two" className="all_posts_container">
        <Grid.Row className="page_title">
          <Grid.Column>
            <h2 className="page_title">Recently Added</h2>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading Posts</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <Post post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default Home;
