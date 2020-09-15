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
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11 arrow" onClick={voteMutation}>
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        <div className="f6 lh-copy gray">
          {link.votes.length} votes | by{" "}
          {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
}
