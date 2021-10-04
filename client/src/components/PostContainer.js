import React, { useContext } from "react";
import { Button, Icon, Label, Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function Post(props) {
  const { user } = useContext(AuthContext);
  const { username, createdAt, body, id, likesCount, commentsCount, likes } =
    props.post;

  return (
    <Card fluid className="post_container">
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="buttons_container">
          <LikeButton user={user} post={{ id, likesCount, likes }} />
          <Button as={Link} labelPosition="right" to={`/posts/${id}`}>
            <Button color="blue">
              <Icon name="comments" />
              <span className="display-control">Comment</span>
            </Button>
            <Label as="a" basic="true" color="blue" pointing="left">
              {commentsCount}
            </Label>
          </Button>
          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </Card.Content>
    </Card>
  );
}

export default Post;
