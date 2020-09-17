import React, { useContext } from "react";
import { timeDifferenceForDate } from "../utils";
import { VOTE_MUTATION } from "../graphql/GraphQLMutations";
import { useMutation } from "@apollo/client";
import { UserContext } from "../providers/userProvider";

export default function Link({ link, index }) {
  const { authToken } = useContext(UserContext);

  const [voteMutation] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div
        className="d-flex flex-column mt-2 p-4 shadow"
        style={{ height: "auto" }}
      >
        <div className="d-flex flex-row justify-content-start align-items-center">
          <div className="text-muted">{index + 1}.</div>
          <div className="text-muted ml-1" onClick={voteMutation}>
            {authToken && <span className="arrow-pointer">▲</span>}
          </div>
          <div className="font-weight-bold ml-1 text-capitalize">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.description}
            </a>
          </div>
          <div className="text-muted ml-1 text-break">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              ( {link.url} )
            </a>
          </div>
        </div>
        <div className="text-black-50 ml-4">
          <span className="ml-2">{link.votes.length} votes | by</span>
          <span className="ml-1">
            {link.postedBy ? link.postedBy.name : "Unknown"}
          </span>
          <span className="ml-1">{timeDifferenceForDate(link.createdAt)}</span>
        </div>
      </div>
    </>
  );
}
