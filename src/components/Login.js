import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/userProvider";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../graphql/GraphQLMutations";

export default function Login() {
  const [login, setLogin] = useState(true);

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const updateFormInput = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };
  const { name, email, password } = formInput;

  let { loginUser } = useContext(UserContext);

  const mutation = login ? LOGIN_MUTATION : SIGNUP_MUTATION;
  const [submit] = useMutation(mutation, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      const token = login ? data.login.token : data.signup.token;
      loginUser(token);
      history.push(`/`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit({ variables: { ...formInput } });
  };

  useEffect(() => {
    if (login) {
      setFormInput({ email: "", password: "" });
    } else {
      setFormInput({ name: "", email: "", password: "" });
    }
    return () => {
      setFormInput({ name: "", email: "", password: "" });
    };
  }, [login]);

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column">
          {!login && (
            <input
              name="name"
              value={name}
              onChange={updateFormInput}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            name="email"
            value={email}
            onChange={updateFormInput}
            type="text"
            placeholder="Your email address"
          />
          <input
            name="password"
            value={password}
            onChange={updateFormInput}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <button type="submit" className="pointer mr2 button">
            {login ? "login" : "create account"}
          </button>

          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin(!login)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}
