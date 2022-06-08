import { gql } from "apollo-server-express";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { productFieldsFragment } from "../fragments/productFieldsFragment";

export const productsQuery = gql`
  query ProductsQuery($input: ProductsQueryInput) {
    products(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      products {
        edges {
          ...ProductFieldsFragment
        }
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${productFieldsFragment}
`;
