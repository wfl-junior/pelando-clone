import { gql } from "@apollo/client";
import { errorFieldsFragment } from "../fragments/errorFieldsFragment";
import { pageInfoFieldsFragment } from "../fragments/pageInfoFieldsFragment";

export const productsQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      ok
      errors {
        ...ErrorFieldsFragment
      }
      products {
        info {
          ...PageInfoFieldsFragment
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

  ${errorFieldsFragment}
  ${pageInfoFieldsFragment}
`;
