import { gql } from "@apollo/client";

export const productsQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      products {
        info {
          hasNextPage
        }
        edges {
          id
          price
          sourceUrl
          title
          image
          createdAt
          store {
            name
          }
        }
      }
    }
  }
`;
