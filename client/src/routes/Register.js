import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { AuthContext } from "../context/authContext";
import FormHandler from "../utils/FormHandler";
import ErrorView from "../components/ErrorView";
import { REGISTER_USER } from "../utils/mutations";

function Register(props) {
  const context = useContext(AuthContext);
  const { values, onSubmit, onChange } = FormHandler(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);

      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    registerUser();
  }
  return (
    <>
      <Form
        onSubmit={onSubmit}
        noValidate
        className={loading ? "loading form-control" : "form-control"}
      >
        <h2 className="page_title">Register</h2>
        <Form.Input
          label="Username"
          type="text"
          placeholder="Username..."
          name="username"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          type="email"
          placeholder="Email..."
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Passoword"
          type="password"
          placeholder="Passoword..."
          name="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button floated="right" primary={true} type="submit">
          Submit
        </Button>
      </Form>
      <ErrorView errors={errors} />
    </>
  );
}

export default Register;
