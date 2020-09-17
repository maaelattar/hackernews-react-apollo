export const httpUri =
  process.env.NODE_ENV === "production"
    ? "https://maa-hacker-news.herokuapp.com/"
    : "http://localhost:4000/";

export const webSocketUri =
  process.env.NODE_ENV === "production"
    ? "wss://maa-hacker-news.herokuapp.com/graphql"
    : "ws://localhost:4000/graphql";
