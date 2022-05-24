import { gql } from "@apollo/client";

export const productsUserVotesQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      products {
        edges {
          id
          userVoteType
        }
      }
    }
  }
`;
