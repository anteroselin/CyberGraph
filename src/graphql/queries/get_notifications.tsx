import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query ($address: String!) {
    identity(address: $address, network: ETH) {
      unreadNotificationCount
      notifications {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        list {
          id
          toAddress
          network
          namespace
          hasRead
          type
          timestamp
          ... on NewConnectionNotification {
            fromAddress
            connectionType
          }
          ... on BiConnectReceivedNotification {
            fromAddress
          }
          ... on BiConnectAcceptedNotification {
            fromAddress
          }
        }
      }
    }
  }
`;