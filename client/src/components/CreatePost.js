import React from "react";
import { Button, Form } from "semantic-ui-react";
import FormHandler from "../utils/FormHandler";
import { CREATE_POST } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/queries";

function CreatePost(props) {
  const { values, onChange, onSubmit } = FormHandler(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: newData,
        },
      });
      values.body = "";
    },

    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a Post:</h2>
        <Form.Field>
          <Form.TextArea
            placeholder="Hi World!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button
            disabled={values.body.trim() === ""}
            primary={true}
            type="submit"
          >
            Post Now!
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

export default CreatePost;
