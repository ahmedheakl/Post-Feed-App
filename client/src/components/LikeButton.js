import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LIKE_POST } from "../utils/mutations";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

function LikeButton({ user, post: { id, likesCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  const buttonConditioned = user ? (
    liked ? (
      <Button color="red" onClick={likePost}>
        <Icon name="heart" />
        Like
      </Button>
    ) : (
      <Button basic="true" color="red" onClick={likePost}>
        <Icon name="heart" />
        Like
      </Button>
    )
  ) : (
    <Button basic="true" as={Link} to="/login" color="red">
      <Icon name="heart" />
      Like
    </Button>
  );
  return (
    <Button as="div" labelPosition="right">
      {buttonConditioned}
      <Label as="a" basic color="red" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
