import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { LINKS_PER_PAGE } from "../constants";
import { FEED_QUERY } from "../graphql/GraphqlQueries";
import { POST_MUTATION } from "../graphql/GraphQLMutations";

export default function CreateLink() {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  const [addLink, { loading, error }] = useMutation(POST_MUTATION, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      history.push("/new/1");
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: "desc" };
      let data = cache.readQuery({
        query: FEED_QUERY,
        variables: { take, skip, orderBy },
      });

      if (data) {
        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: [...data.feed.links, post],
            },
          },
          variables: { take, skip, orderBy },
        });
      } else {
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink({ variables: { url, description } });
  };

  return (
    <div>
      <div className="flex flex-column mt3">
        <form onSubmit={handleSubmit}>
          <input
            className="mb2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="A description for the link"
            required
          />
          <input
            className="mb2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="url"
            placeholder="https://example.com"
            required
          />
          <button type="submit">Submit</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error :( Please try again</p>}
      </div>
    </div>
  );
}
