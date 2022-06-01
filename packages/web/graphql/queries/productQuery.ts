import { gql } from "@apollo/client";

export const productQuery = gql`
  query ProductQuery($input: ProductQueryInput!) {
    product(input: $input) {
      ok
      errors {
        path
        message
      }
      product {
        id
        createdAt
        body
        price
        sourceUrl
        title
        image
        temperature
        userVoteType
        couponCode
        store {
          name
        }
        category {
          title
          slug
        }
      }
    }
  }
`;
