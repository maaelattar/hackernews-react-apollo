import React from "react";
import Link from "./Link";
import { FEED_QUERY } from "../graphql/GraphqlQueries";
import { useQuery } from "@apollo/client";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { LINKS_PER_PAGE } from "../constants";
import {
  NEW_LINKS_SUBSCRIPTION,
  NEW_VOTES_SUBSCRIPTION,
} from "../graphql/GraphQLSubscriptions";

export default function LinkList() {
  const subscribeToNewLinks = (subscribeToMore) => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);
        if (exists) return prev;

        return Object.assign({}, prev, {
          feed: {
            links: [newLink, ...prev.feed.links],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename,
          },
        });
      },
    });
  };

  const subscribeToNewVotes = (subscribeToMore) => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    });
  };

  const isNewPage = useRouteMatch("/new/:page");

  const getLinksToRender = (data) => {
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  };
  const history = useHistory();

  let { page } = useParams();
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = isNewPage ? { createdAt: "desc" } : null;
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;

  const { loading, error, data, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: { take, skip, orderBy },
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      subscribeToNewLinks(subscribeToMore);
      subscribeToNewVotes(subscribeToMore);
    },
  });

  if (loading) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
  const linksToRender = getLinksToRender(data);
  const nextPage = (data) => {
    page = Number(page);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  };
  return (
    <div className="mt-4">
      {linksToRender.map((link, index) => (
        <Link key={link.id} link={link} index={index + pageIndex} />
      ))}
      {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <div className="pointer mr2" onClick={previousPage}>
            Previous
          </div>
          <div className="pointer" onClick={() => nextPage(data)}>
            Next
          </div>
        </div>
      )}
    </div>
  );
}
