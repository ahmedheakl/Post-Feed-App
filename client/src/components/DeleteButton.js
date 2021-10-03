import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_POST, DELETE_COMMENT } from "../utils/mutations";
import { Confirm, Button, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/queries";

function DeleteButton({ postId, commentId, deletePostCallback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const DYNAMIC_MUTATION = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(DYNAMIC_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        console.log(data);
        let newData = [...data.getPosts];
        console.log(newData);
        newData = newData.filter((p) => p.id !== postId);
        console.log(newData);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { ...data, getPosts: newData },
        });
      }

      if (deletePostCallback) deletePostCallback();
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <Button
        as="div"
        floated="right"
        labelPosition="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Button color="red" size={commentId ? "mini" : "medium"}>
          <Icon name="trash" />
          Delete
        </Button>
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

export default DeleteButton;
