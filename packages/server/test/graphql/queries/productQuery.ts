import { gql } from "apollo-server-express";
import { fieldErrorFieldsFragment } from "../fragments/fieldErrorFieldsFragment";
import { productFieldsFragment } from "../fragments/productFieldsFragment";

export const productQuery = gql`
  query ProductQuery($input: ProductQueryInput!) {
    product(input: $input) {
      ok
      errors {
        ...FieldErrorFieldsFragment
      }
      product {
        ...ProductFieldsFragment
      }
    }
  }

  ${fieldErrorFieldsFragment}
  ${productFieldsFragment}
`;
