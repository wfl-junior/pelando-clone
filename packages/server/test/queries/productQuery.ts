import { gql } from "apollo-server-express";

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
