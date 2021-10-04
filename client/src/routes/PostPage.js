import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import CreateComment from "../components/CreateComment";
import { useQuery } from "@apollo/client";
import { SINGLE_POST_QUERY } from "../utils/queries";
import {
  Grid,
  Image,
  Card,
  Label,
  Button,
  Icon,
  Transition,
} from "semantic-ui-react";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import moment from "moment";
import { Link } from "react-router-dom";
function PostPage(props) {
  const postId = props.match.params.id;
  const [postData, setPostData] = useState(null);
  const { user } = useContext(AuthContext);
  const { data } = useQuery(SINGLE_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postContent;

  useEffect(() => {
    if (data) {
      setPostData(data.getPost);
    }
  }, [data]);

  function deletePostCallback() {
    props.history.push("/");
  }

  postContent = postData ? (
    <>
      {user ? (
        <Label color="blue" style={{ marginBottom: "10px" }} tag>
          Logged in
        </Label>
      ) : (
        <Label
          color="red"
          style={{ marginBottom: "10px" }}
          as={Link}
          to="/login"
          tag
        >
          Login To Add Comment
        </Label>
      )}
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="medium"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{postData.username}</Card.Header>
                <Card.Meta>{moment(postData.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{postData.body}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="buttons_container">
                  <LikeButton
                    user={user}
                    post={{
                      id: postData.id,
                      likesCount: postData.likesCount,
                      likes: postData.likes,
                    }}
                  />
                  <Button as="div" labelPosition="right">
                    <Button color="blue">
                      <Icon name="comments" />
                      <span className="display-control">Comment</span>
                    </Button>
                    <Label as="a" basic="true" color="blue" pointing="left">
                      {postData.commentsCount}
                    </Label>
                  </Button>
                  {user && user.username === postData.username && (
                    <DeleteButton
                      postId={postId}
                      deletePostCallback={deletePostCallback}
                    />
                  )}
                </div>
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <CreateComment postId={postData.id} />
                </Card.Content>
              </Card>
            )}
            <Transition.Group>
              {postData.comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && comment.username === user.username && (
                      <DeleteButton
                        user={user}
                        commentId={comment.id}
                        postId={postId}
                      />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Transition.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  ) : (
    <p>Loading ... </p>
  );
  return postContent;
}

export default PostPage;
