import { gql } from "@apollo/client";

export const GET_SOCIAL = gql`
    query GetIdentity($address: String!) {
        identity(address: $address) {
            twitter {
                handle
                avatar
                verified
                tweetId
                source
                followerCount
            }

            github {
                username
                gistId
                userId
            }
        }
    }
`;
