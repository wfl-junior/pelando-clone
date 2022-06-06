import { gql } from "@apollo/client";

export const voteOnProductMutation = gql`
  mutation VoteOnProduct($input: VoteOnProductInput!) {
    voteOnProduct(input: $input) {
      ok
      errors {
        path
        message
      }
      product {
        id
        createdAt
        body
        couponCode
        price
        sourceUrl
        title
        image
        temperature
        store {
          id
          createdAt
          slug
          name
          url
          image
        }
        category {
          id
          createdAt
          slug
          title
        }
      }
    }
  }
`;
