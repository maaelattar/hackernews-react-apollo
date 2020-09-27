import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/userProvider";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/GraphQLMutations";
import { Form, Button } from "react-bootstrap";

export default function Login() {
  const [login, setLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { authToken } = useContext(UserContext);

  let { loginUser } = useContext(UserContext);

  const mutation = login ? LOGIN_MUTATION : SIGNUP_MUTATION;
  const [submit] = useMutation(mutation, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      const token = login ? data.login.token : data.signup.token;
      loginUser(token);
      history.go(0);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login
      ? submit({ variables: { email, password } })
      : submit({ variables: { name, email, password } });
  };

  return (
    <>
      {authToken ? (
        <h4 className="text-center mt-4 display-3">You are logged in</h4>
      ) : (
        <div>
          <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
          <Form onSubmit={handleSubmit}>
            {!login && (
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="text-capitalize mr-4"
              variant="primary"
              type="submit"
            >
              {login ? "login" : "create account"}
            </Button>

            <Button
              className="text-capitalize"
              variant="outline-secondary"
              type="button"
              onClick={() => setLogin(!login)}
            >
              {login
                ? "need to create an account?"
                : "already have an account?"}
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
