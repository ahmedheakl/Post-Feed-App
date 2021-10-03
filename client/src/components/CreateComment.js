import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";

function CreatePost({ postId }) {
  const [comment, setComment] = useState("");

  const [createPost, { error }] = useMutation(CREATE_COMMENT, {
    variables: { body: comment, postId: postId },
    update() {
      setComment("");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
    },
  });

  function onSubmit(e) {
    e.preventDefault();
    createPost();
  }

  function onChange(e) {
    setComment(e.target.value);
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h4>Create a Comment:</h4>
        <Form.Field>
          <Form.Input
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={comment}
            error={error ? true : false}
          />
          <Button
            disabled={comment.trim() === ""}
            floated="right"
            primary={true}
            type="submit"
          >
            Comment
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

export default CreatePost;
