// src\graphql\queries\get_topranking.tsx

import { gql } from "@apollo/client";

export const GET_TOPRANKING = gql`
    query QueryRec(
        $first: Int
        $after: String
    ) {
        rankings(network: ETH, type: FOLLOW, namespaces: ["CyberConnect"] , first:$first, after:$after) {
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            list {
              address
              domain
              followerCount
            }
        }
    }
`;
