import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition, Label } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";
import { FETCH_POSTS_QUERY } from "../utils/queries";

import Post from "../components/PostContainer";
import CreatePost from "../components/CreatePost";
import { Link } from "react-router-dom";

function Home(props) {
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
          <Label color="blue" tag>
            Logged in
          </Label>
          <CreatePost />
        </>
      ) : (
        <>
          <Label color="red" as={Link} to="/login" tag>
            Login To Create Post
          </Label>
        </>
      )}
      <Grid>
        <Grid.Row>
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
