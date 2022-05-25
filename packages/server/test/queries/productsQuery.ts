import { gql } from "apollo-server-express";

export const productsQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      products {
        edges {
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
  }
`;
