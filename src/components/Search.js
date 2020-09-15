import React, { useState } from "react";
import Link from "./Link";
import { FEED_SEARCH_QUERY } from "../graphql/GraphqlQueries";
import { useLazyQuery } from "@apollo/client";

export default function Search() {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("");

  const [searchLinks, { loading, error }] = useLazyQuery(FEED_SEARCH_QUERY, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setLinks(data.feed.links);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    searchLinks({
      variables: { filter },
    });
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        {error}
        Search
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button type="submit">OK</button>
        </form>
      </div>
      {links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
}
