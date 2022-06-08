import { gql } from "@apollo/client";

export const fieldErrorFieldsFragment = gql`
  fragment FieldErrorFieldsFragment on FieldError {
    path
    message
  }
`;
