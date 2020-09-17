import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { LINKS_PER_PAGE } from "../constants";
import { FEED_QUERY } from "../graphql/GraphqlQueries";
import { POST_MUTATION } from "../graphql/GraphQLMutations";
import { Form, Button } from "react-bootstrap";

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
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group controlId="formGroupDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="A description for the link"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formGroupURL">
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </Form.Group>
      <Button className="text-capitalize" variant="primary" type="submit">
        Submit
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </Form>
    // </div>
  );
}
