import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { AUTH_TOKEN } from "./constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserProvider } from "./providers/userProvider";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const authToken = localStorage.getItem(AUTH_TOKEN);

const httpUri =
  process.env.NODE_ENV === "production"
    ? "https://maa-hacker-news.herokuapp.com/"
    : "http://localhost:4000/";

const webSocketUri =
  process.env.NODE_ENV === "production"
    ? "https://maa-hacker-news.herokuapp.com/"
    : "ws://localhost:4000/graphql";

const wsLink = new WebSocketLink({
  uri: webSocketUri,
  timeout: 30000,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: authToken,
    },
  },
});

const httpLink = createHttpLink({
  uri: httpUri,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
