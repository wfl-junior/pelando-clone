import { gql } from "@apollo/client";

export const errorFieldsFragment = gql`
  fragment ErrorFieldsFragment on FieldError {
    path
    message
  }
`;
