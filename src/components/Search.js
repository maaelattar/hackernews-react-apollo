import React, { useState } from "react";
import Link from "./Link";
import { FEED_SEARCH_QUERY } from "../graphql/GraphqlQueries";
import { useLazyQuery } from "@apollo/client";
import { Form, Button } from "react-bootstrap";

export default function Search() {
  const [filter, setFilter] = useState("");

  const [searchLinks, { loading, error, data }] = useLazyQuery(
    FEED_SEARCH_QUERY,
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    searchLinks({
      variables: { filter },
    });
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  let linksToRender = [];
  if (data) {
    linksToRender = data.feed.links;
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Row className="align-items-center">
          <Form.Group controlId="ControlInput1" className="w-75">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL or Description"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Form.Group>
          <Button
            className="text-capitalize ml-4 mt-2"
            variant="primary"
            type="submit"
          >
            OK
          </Button>
        </Form.Row>
      </Form>
      <div className="mt-4">
        {linksToRender.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    </>
  );
}
